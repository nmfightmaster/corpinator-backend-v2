import {
  authorizationEndpoint,
  tokenEndpoint,
  revokeEndpoint,
  jwks,
} from "../loaders/eveAuthURLs.js";
import scopesString from "../config/scopes/scopes.js";
import config from "../config/index.js";
import EveTokenResponse from "../models/EveTokenResponse.js";
import EveJwtPayload from "../models/EveJwtPayload.js";
import { SsoException } from "../exceptions/SsoException.js";
import prismaClient from "../database/client.js";
import type {
  CharacterModel,
  SessionModel,
} from "../generated/prisma/models.js";
import { Prisma } from "../generated/prisma/client.js";
import { encrypt, decrypt } from "../util/cryptoUtil.js";
import * as jose from "jose";
import logger from "../loaders/logger.js";

type CharacterRow = {
  access_token: string;
  refresh_token: string;
};

function buildAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.eve.clientId,
    redirect_uri: config.eve.redirectUri,
    scope: scopesString,
    state,
  });

  return `${authorizationEndpoint}?${params.toString()}`;
}

async function exchangeCodeForTokens(code: string): Promise<EveTokenResponse> {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
  });

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${config.eve.clientId}:${config.eve.clientSecret}`).toString("base64")}`,
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new SsoException(
      response.status,
      `Failed to exchange code for token: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as EveTokenResponse;
  return data;
}

async function decodeCharacterFromToken(accessToken: string): Promise<{
  characterId: number;
  characterName: string;
  exp: number;
}> {
  const verifiedJwt = await jose.jwtVerify<EveJwtPayload>(accessToken, jwks, {
    issuer: ["https://login.eveonline.com", "login.eveonline.com"],
    audience: [config.eve.clientId],
  });
  const payload = verifiedJwt.payload;
  if (!Array.isArray(payload.aud)) {
    throw new SsoException(502, "Invalid token: malformed aud claim.");
  }
  if (!payload.aud.includes("EVE Online")) {
    throw new SsoException(502, "Invalid token: missing portion of aud claim.");
  }
  const characterId = parseInt(payload.sub.split(":").pop() || "", 10);
  if (isNaN(characterId)) {
    throw new SsoException(
      502,
      "Invalid token: unable to extract character ID from sub claim.",
    );
  }
  const characterName = payload.name;
  const exp = payload.exp;
  return { characterId, characterName, exp };
}

function upsertCharacter(
  characterId: number,
  characterName: string,
  accessToken: string,
  refreshToken: string,
): Promise<CharacterModel> {
  const encryptedAccessToken = encrypt(accessToken);
  const encryptedRefreshToken = encrypt(refreshToken);

  return prismaClient.character.upsert({
    where: { id: characterId },
    create: {
      id: characterId,
      name: characterName,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
    },
    update: {
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
    },
  });
}

function createSession(characterId: number): Promise<SessionModel> {
  return prismaClient.session.create({
    data: {
      characterId,
      expiresAt: new Date(Date.now() + config.session.eveSessionTtlMs),
    },
  });
}

function getSession(sessionId: string) {
  return prismaClient.session.findUnique({
    where: {
      id: sessionId,
      expiresAt: { gt: new Date() },
    },
  });
}

async function deleteSession(sessionId: string) {
  try {
    return await prismaClient.session.delete({
      where: {
        id: sessionId,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return;
    }
    throw error;
  }
}

async function logoutSession(sessionId: string) {
  const session = await prismaClient.session.findUnique({
    where: {
      id: sessionId,
    },
  });
  if (!session) {
    return;
  }
  const character = await getCharacter(session.characterId);
  if (!character) {
    throw new SsoException(404, "Character not found.");
  }
  const encryptedRefreshToken = character.refreshToken;
  try {
    await revokeRefreshToken(decrypt(encryptedRefreshToken));
  } catch (error) {
    logger.error(error);
  }
  await deleteSession(sessionId);
}

function deleteExpiredSessions() {
  return prismaClient.session.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });
}

async function getValidAccessToken(characterId: number) {
  const character = await getCharacter(characterId);
  if (!character) {
    throw new SsoException(404, "Character not found.");
  }
  let needsRefresh = false;
  const decryptedAccessToken = decrypt(character.accessToken);
  needsRefresh = await checkTokenExpired(decryptedAccessToken);
  if (!needsRefresh) {
    return decryptedAccessToken;
  }
  const accessToken = await prismaClient.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<
      CharacterRow[]
    >`SELECT access_token, refresh_token FROM characters WHERE id = ${characterId} FOR UPDATE`;
    if (rows.length === 0) {
      throw new SsoException(404, "Character not found.");
    }
    const duplicateRefreshCheck = await checkTokenExpired(
      decrypt(rows[0].access_token),
    );
    if (duplicateRefreshCheck) {
      const newTokens = await refreshTokens(decrypt(rows[0].refresh_token));
      await tx.character.update({
        where: { id: characterId },
        data: {
          accessToken: encrypt(newTokens.access_token),
          refreshToken: encrypt(newTokens.refresh_token),
        },
      });
      return newTokens.access_token;
    } else {
      return decrypt(rows[0].access_token);
    }
  });
  return accessToken;
}

function getCharacter(characterId: number) {
  return prismaClient.character.findUnique({
    where: { id: characterId },
  });
}

async function refreshTokens(refreshToken: string): Promise<EveTokenResponse> {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${config.eve.clientId}:${config.eve.clientSecret}`).toString("base64")}`,
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new SsoException(
      response.status,
      `Failed to refresh token: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as EveTokenResponse;
  return data;
}

async function revokeRefreshToken(refreshToken: string): Promise<void> {
  const params = new URLSearchParams({
    token: refreshToken,
    token_type_hint: "refresh_token",
  });

  await fetch(revokeEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${config.eve.clientId}:${config.eve.clientSecret}`).toString("base64")}`,
    },
    body: params.toString(),
  });
}

async function checkTokenExpired(unencryptedToken: string) {
  try {
    const decodedCharacter = await decodeCharacterFromToken(unencryptedToken);
    const exp = decodedCharacter.exp;
    if (exp * 1000 < Date.now() + 60000) {
      return true;
    }
  } catch (error) {
    if (!(error instanceof jose.errors.JWTExpired)) {
      throw error;
    }
    return true;
  }
  return false;
}

export {
  buildAuthUrl,
  exchangeCodeForTokens,
  decodeCharacterFromToken,
  upsertCharacter,
  createSession,
  getSession,
  logoutSession,
  deleteExpiredSessions,
  getValidAccessToken,
};

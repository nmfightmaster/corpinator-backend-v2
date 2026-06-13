import {
  authorizationEndpoint,
  tokenEndpoint,
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

function decodeCharacterFromToken(accessToken: string): {
  characterId: number;
  characterName: string;
} {
  const payloadBase64 = accessToken.split(".")[1];
  if (!payloadBase64) {
    throw new SsoException(502, "Invalid token: missing payload segment.");
  }
  const payloadJson = Buffer.from(payloadBase64, "base64url").toString("utf-8");
  const payload = JSON.parse(payloadJson) as EveJwtPayload;
  const characterId = parseInt(payload.sub.split(":").pop() || "", 10);
  const characterName = payload.name;

  if (isNaN(characterId)) {
    throw new SsoException(
      502,
      "Invalid token: unable to extract character ID from sub claim.",
    );
  }

  return { characterId, characterName };
}

function upsertCharacter(
  characterId: number,
  characterName: string,
  refreshToken: string,
): Promise<CharacterModel> {
  return prismaClient.character.upsert({
    where: { id: characterId },
    create: { id: characterId, name: characterName, refreshToken },
    update: { refreshToken },
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

export {
  buildAuthUrl,
  exchangeCodeForTokens,
  decodeCharacterFromToken,
  upsertCharacter,
  createSession,
};

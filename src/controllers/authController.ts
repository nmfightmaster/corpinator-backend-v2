import { Request, Response } from "express";
import {
  buildAuthUrl,
  exchangeCodeForTokens,
  decodeCharacterFromToken,
  upsertCharacter,
  createSession,
  deleteSession,
} from "../services/EveSsoService.js";
import config from "../config/index.js";
import { HttpException } from "../exceptions/HttpException.js";

async function login(req: Request, res: Response) {
  const state = crypto.randomUUID();

  res.cookie("state", state, {
    httpOnly: true,
    signed: true,
    secure: config.nodeEnv === "production",
    maxAge: 300000,
    sameSite: "lax",
  });

  const url = buildAuthUrl(state);

  return res.redirect(url);
}

async function callback(req: Request, res: Response) {
  const state = req.query.state;
  const code = req.query.code;
  const signedState = req.signedCookies.state;

  if (!signedState || typeof state !== "string" || state !== signedState) {
    throw new HttpException(401, "Unauthorized.");
  }

  if (!code || typeof code !== "string") {
    throw new HttpException(400, "Provided code is not a string.");
  }

  res.clearCookie("state");

  const tokens = await exchangeCodeForTokens(code);

  const character = decodeCharacterFromToken(tokens.access_token);

  await upsertCharacter(
    character.characterId,
    character.characterName,
    tokens.access_token,
    tokens.refresh_token,
  );

  const session = await createSession(character.characterId);

  res.cookie("session", session.id, {
    httpOnly: true,
    signed: true,
    secure: config.nodeEnv === "production",
    maxAge: config.session.eveSessionTtlMs,
    sameSite: "lax",
  });

  config.frontendUrl ? res.redirect(config.frontendUrl) : res.sendStatus(200);
}

async function logout(req: Request, res: Response) {
  const sessionCookie = req.signedCookies.session;

  if (sessionCookie) {
    await deleteSession(sessionCookie);
  }

  res.clearCookie("session");
  res.sendStatus(200);
}

export { login, callback, logout };

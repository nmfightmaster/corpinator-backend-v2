import { Request, Response } from "express";
import {
  buildAuthUrl,
  exchangeCodeForTokens,
  decodeCharacterFromToken,
  upsertCharacter,
  createSession,
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
    tokens.refresh_token,
  );

  const session = await createSession(character.characterId);

  res.cookie("session", session.id, {
    httpOnly: true,
    signed: true,
    secure: config.nodeEnv === "production",
    maxAge: config.session.eveSessionTtlMs,
  });

  config.frontendUrl ? res.redirect(config.frontendUrl) : res.sendStatus(200);
}

export { login, callback };

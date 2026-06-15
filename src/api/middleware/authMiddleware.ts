import { Request, Response, NextFunction } from "express";
import { getSession } from "../../services/EveSsoService.js";
import { HttpException } from "../../exceptions/HttpException.js";

async function auth(req: Request, res: Response, next: NextFunction) {
  const sessionCookie = req.signedCookies.session;
  if (!sessionCookie) {
    throw new HttpException(401, "Invalid session.");
  }
  const session = await getSession(sessionCookie);
  if (!session) {
    throw new HttpException(401, "Invalid session.");
  }
  req.characterId = session.characterId;
  return next();
}

export default auth;

import { Request, Response } from "express";
import { fetchCharacterDetail } from "../services/EsiService.js";
import { HttpException } from "../exceptions/HttpException.js";

async function getCharacter(req: Request, res: Response) {
  if (req.characterId === undefined) {
    throw new HttpException(500, "Missing character ID.");
  }
  const characterId = req.characterId;
  const characterInfo = await fetchCharacterDetail(characterId);
  return res.json(characterInfo);
}

export { getCharacter };

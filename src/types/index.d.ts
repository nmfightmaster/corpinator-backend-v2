import "express";

declare global {
  namespace Express {
    interface Request {
      characterId: number;
    }
  }
}

export {};

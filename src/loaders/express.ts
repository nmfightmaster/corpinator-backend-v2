import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../api/index.js";
import config from "../config/index.js";
import logger from "../loaders/logger.js";

import { AppException } from "../exceptions/AppException.js";
import { HttpException } from "../exceptions/HttpException.js";

export default ({ app }: { app: express.Application }) => {
  app.use(helmet());
  app.use(cors({ origin: config.cors.origins }));
  app.use(express.json());
  app.use(cookieParser(config.session.secret));
  app.set("trust proxy", config.trustProxy);
  app.use(config.api.prefix, routes());
  app.use((req, res, next) => {
    const err = new HttpException(404, "Not Found");
    next(err);
  });
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (err instanceof AppException) {
        res.status(err.status).json({ message: err.message });
      } else {
        logger.error("Unexpected error", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },
  );
};

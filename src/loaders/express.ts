import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../api/index.js";
import config from "../config/index.js";

import { HttpException } from "../exceptions/HttpException.js";

export default ({ app }: { app: express.Application }) => {
  app.use(cors({ origin: config.cors.origins }));

  app.use(express.json());

  app.use(cookieParser(config.session.secret));

  app.enable("trust proxy");

  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new HttpException(404, "Not Found");
    next(err);
  });

  app.use(
    (
      err: HttpException,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      res.status(err.status || 500);
      res.json({
        errors: {
          message: err.message,
        },
      });
    },
  );
};

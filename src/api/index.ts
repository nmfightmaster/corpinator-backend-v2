import { Router } from "express";
import health from "./routes/health.js";
import auth from "./routes/auth.js";

export default () => {
  const app = Router();

  health(app);

  auth(app);

  return app;
};

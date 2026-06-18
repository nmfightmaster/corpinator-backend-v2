import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  login,
  callback,
  logout,
  logoutAll,
} from "../../controllers/authController.js";
import config from "../../config/index.js";
import auth from "../middleware/authMiddleware.js";

const authRateLimit = rateLimit({
  windowMs: config.rateLimit.authWindowMs,
  limit: config.rateLimit.authLimit,
});

const router = Router();

export default (app: Router) => {
  app.use("/auth", authRateLimit, router);

  router.get("/login", login);
  router.get("/callback", callback);
  router.delete("/logout", logout);
  router.delete("/logout/all", auth, logoutAll);
};

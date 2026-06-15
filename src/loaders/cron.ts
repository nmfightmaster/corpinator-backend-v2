import { deleteExpiredSessions } from "../services/EveSsoService.js"
import logger from "./logger.js";

const ONE_HOUR_MS = 60 * 60 * 1000;

export function loadCronJobs() {
  setInterval(() => {
    deleteExpiredSessions().catch((error) => {
      logger.error("Failed to delete expired sessions.", error);
    });
  }, ONE_HOUR_MS)
}
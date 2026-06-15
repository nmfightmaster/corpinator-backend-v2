import express from "express";
import expressLoader from "./express.js";
import logger from "./logger.js";
import { loadEveAuthURLs } from "./eveAuthURLs.js";
import { loadCronJobs } from "./cron.js";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  logger.info("------------------------------")
  logger.info("Loading EVE Online auth URLs.");
  await loadEveAuthURLs();
  logger.info("EVE Online auth URLs loaded.");

  logger.info("------------------------------")
  logger.info("Loading CRONs");
  loadCronJobs();
  logger.info("CRONs loaded.")

  // Load me last!
  logger.info("------------------------------")
  logger.info("Loading Express.");
  expressLoader({ app: expressApp });
  logger.info("Express loaded.");
  logger.info("------------------------------")
};

export { default as logger } from "./logger.js";

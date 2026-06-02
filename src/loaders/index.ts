import express from 'express';
import expressLoader from './express';
import logger from './logger';

export default async ({ expressApp }: { expressApp: express.Application }) => {
    logger.info('Loading Express.');

    await expressLoader({ app: expressApp });
    logger.info('Express loaded.');
}

export { default as logger } from './logger';

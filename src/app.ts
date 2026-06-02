import express from 'express';
import config from './config';
import loaders from './loaders';
import logger from './loaders/logger';

async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    app.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}`);
    });
}

startServer();
import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';

import { HttpException } from '../exceptions/HttpException';

export default ({ app }: { app: express.Application }) => {
    app.use(cors());
    
    app.use(express.json());

    app.enable('trust proxy');
    
    app.use(config.api.prefix, routes());

    app.use((req, res, next) => {
        const err = new HttpException(404, 'Not Found');
        next(err);
    });

    app.use((err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
}
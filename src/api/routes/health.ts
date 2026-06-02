import { Router, Request, Response } from 'express';
//import middleware from '../middleware';
const router = Router();
const version = require ('../../../package.json').version;

export default (app: Router) => {
    app.use('/health', router);

    router.get('/', /*middleware.isAuth,*/ (req: Request, res: Response) => {
        return res.json({ status: 'ok', version: version}).status(200);
    });
};
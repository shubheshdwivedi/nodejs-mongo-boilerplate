import {Router} from 'express';
import indexRouter from "./IndexRouter";
import Auth from "./auth/Auth";

export default () => {
    const router = Router();
    indexRouter(router);
    Auth(router);

    return router;
}
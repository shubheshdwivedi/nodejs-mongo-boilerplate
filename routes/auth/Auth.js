import {Router} from 'express';
import AuthService from "../../services/auth/AuthService";
import logger from "../../log/logger";
import ErrorCodes from "../../scripts/ErrorCodes";

const route  = Router();

export default (router) => {
    router.use('/auth', route);

    // LOGIN NEW USER
    route.post('/login',
        async (req, res, next) => {
            const userDao = req.body;
            try {
                const loginResult = await AuthService.Login(userDao);
                return res.status(loginResult.httpCode).json(loginResult);
            } catch (err) {
                logger.error(err);
                return res.status(503).json({
                    success: "false",
                    error: {
                        message: err.errmsg
                    }
                })
            }
        });

    // REGISTER NEW USER
    route.post('/register',
        async (req, res, next) => {
            const userDao = req.body;
            try {
                const loginResult = await AuthService.SignUp(userDao);
                return res.status(loginResult.httpCode).json(loginResult);
            } catch (err) {
                logger.error(err);
                return res.status(503).json({
                    success: "false",
                    error: {
                        message: ErrorCodes[err.code]
                    }
                })
            }
        })
}
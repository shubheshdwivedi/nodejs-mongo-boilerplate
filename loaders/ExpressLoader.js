import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from '../routes';
import config from "../config/Config";
import logger from "../log/logger";

export default async (app) => {
    app.enable('trust proxy');
    app.use(cors());
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(config.apiPrefix, routes());
    app.use(function(req, res, next){
        logger.error('404 page requested');
        res.status(404).send('This page does not exist!');
    });
    return app;
}
import express, { Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import noCache from 'nocache';
import bodyParser from 'body-parser';
import expressFileupload from 'express-fileupload';

import routers from 'apis';
import initializeResources from 'resources';
import configs from 'configs';
import { errorMiddleware } from 'middlewares';
import { logger } from 'utils/logger';
import morganMiddleware from 'utils/morgan';

const app = express();

const corsOption = {
  credentials: true,
  origin: ['https://tiktokbyme.xyz', 'http://localhost:3000'],
};

app.use(cors(corsOption));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(expressFileupload({ useTempFiles: false }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '100mb',
  })
);

function initializeSecurity() {
  app.use(noCache());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());

  morganMiddleware(app);
}

function initializeMiddlewares() {
  app.use(express.json());

  // use for computing processing time on response
  app.use((req: any, _res: Response, next: NextFunction) => {
    req.startTime = Date.now();
    next();
  });
}

function initializeErrorHandler() {
  app.use(errorMiddleware);
}

initializeSecurity();
initializeMiddlewares();
app.use(routers);
initializeErrorHandler();

const PORT = configs.port || 3000;

export const listen = async () => {
  await initializeResources();
  app.listen(PORT, () => {
    logger.info(`=================================`);
    logger.info(`🚀 ⚡️[server]: Server is running at http://localhost:${PORT}`);
    logger.info(`=================================`);
  });
};

export default app;

import express, { Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import noCache from 'nocache';

import routers from 'apis';
import initializeResources from 'resources';
import configs from 'configs';
import { errorMiddleware } from 'middlewares';
import { logger } from 'utils/logger';

const app = express();

app.use(cors());

function initializeSecurity() {
  app.use(noCache());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
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

import morgan from 'morgan';
import { Express } from 'express';

const developmentEnvironment = (app: Express) => {
  return app.use(morgan('dev'));
};

const productionEnvironment = (app: Express) => {
  return app.use(morgan('combined'));
};

const morganMiddleware = (app: Express) => {
  return process.env.NODE_ENV === 'production' ? productionEnvironment(app) : developmentEnvironment(app);
};

export default morganMiddleware;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import noCache from 'nocache';

import routers from 'apis';
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

initializeSecurity();
app.use(routers);

export default app;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import noCache from 'nocache';

import routers from 'apis';
import initializeResources from 'resources';
import configs from 'configs';

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

const PORT = configs.port || 3000;

export const listen = async () => {
  await initializeResources();
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
};

export default app;

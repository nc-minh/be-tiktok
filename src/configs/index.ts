import dotenv from 'dotenv';
import dotenvSafe from 'dotenv-safe';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
dotenvSafe.config({
  allowEmptyValues: true,
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  apiKey: process.env.API_KEY,
  mongodb: {
    protocol: process.env.MONGODB_PROTOCOL,
    username: process.env.MONGODB_USERNAME,
    pasword: process.env.MONGODB_PASSWORD,
    host: process.env.MONGODB_HOST,
    replicaSet: process.env.MONGODB_REPLICA_SET,
    dbName: process.env.MONGODB_NAME,
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  },
};

import { connect, connection } from 'mongoose';

import configs from 'configs';
import { logger } from 'utils/logger';

const mongoDBConfig = configs.mongodb;

const mongodbProtocol = mongoDBConfig.protocol || 'mongodb';

const userNamePwd = mongoDBConfig.username ? `${mongoDBConfig.username}:${mongoDBConfig.pasword}@` : '';

let mongodbUrl = `${mongodbProtocol}://${userNamePwd}${mongoDBConfig.host}/${mongoDBConfig.dbName}?retryWrites=true`;

if (mongoDBConfig.replicaSet) {
  mongodbUrl += `&replicaSet=${mongoDBConfig.replicaSet}`;
}

const options = {
  autoIndex: true,
  autoCreate: true,
};

export default async () => {
  try {
    logger.info('Starting connect to MongoDB...');

    await connect(mongodbUrl, options);

    connection.on('connected', function () {
      logger.info('MongoDB::: Successfully connected to MongoDB');
    });

    connection.on('disconnected', function () {
      logger.info(`\nMongoDB::: Disconnected`);
    });

    connection.on('error', (error) => {
      logger.error('MongoDB::: Connection error::::', JSON.stringify(error));
    });

    logger.info('Successfully connected to MongoDB');
  } catch (error) {
    logger.error(`MongoDB::: Error in tryCatch::: ${error}`);
  }
};

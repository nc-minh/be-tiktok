import configs from 'configs';
import { connect, connection } from 'mongoose';

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
    console.log('Starting connect to MongoDB...');

    await connect(mongodbUrl, options);

    connection.on('connected', function () {
      console.log('MongoDB::: Successfully connected to MongoDB');
    });

    connection.on('disconnected', function () {
      console.log(`\nMongoDB::: Disconnected`);
    });

    connection.on('error', (error) => {
      console.log('MongoDB::: Connection error::::', JSON.stringify(error));
    });

    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log('MongoDB::: Error in tryCatch:::', error);
  }
};

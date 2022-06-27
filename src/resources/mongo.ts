import configs from 'configs';
import { connect, connection } from 'mongoose';

const mongoDBConfig = configs.mongodb;

const mongodbUrl = mongoDBConfig.uri || '';

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

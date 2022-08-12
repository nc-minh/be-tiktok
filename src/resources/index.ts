import configs from 'configs';
import connectMongo from './mongo';
import { client } from './elasticsearch';
import { MongodbSubmitToElasticSearch } from 'libs/elasticsearch';
import { UserModel } from 'models';
import { logger } from 'utils/logger';
import { connect } from './cloudinary';
import { redis } from './redis';

export default async () => {
  if (configs.mongodb.host) {
    await connectMongo();
  }

  if (configs.cloudinary.cloud_name) {
    await connect;

    logger.info(`Successfully connected to Cloudinary: ${connect.cloud_name}`);
  }

  try {
    if (client) {
      const clientInfo = await client.info();
      logger.info(`Successfully connected to ElasticSearch: cluster_name:${clientInfo.cluster_name}`);
      const healthInfo = await client.cluster.health();
      logger.info(healthInfo);
    }
  } catch (error) {
    logger.error(`ES::: Connection error::: ${error}`);
  }

  if (configs.redisHost) {
    logger.info(`Redis status: ${redis.status}`);
  }
};

export const MongoEs = new MongodbSubmitToElasticSearch(client, UserModel);

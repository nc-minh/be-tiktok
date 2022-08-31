import IORedis, { Redis } from 'ioredis';

import configs from 'configs';
import { logger } from 'utils/logger';

const connection = (): Redis => {
  if (!configs.redisHost) {
    return null as any;
  }
  const redisInstance = new IORedis(configs.redisHost, { connectTimeout: 10000 });

  redisInstance.on('error', (error: any) => {
    logger.error(`Redis error: ${error}`);
  });

  redisInstance.on('connect', () => {
    logger.info('Redis connected');
  });

  return redisInstance;
};

const redis = connection();

const set = async (key: string, value: any, ttl: number | string) => {
  logger.info(`set cache with key: ${key}`);
  return redis.set(key, value, 'EX', ttl);
};

const setNX = async (key: string, value: any, ttl: number | string) => {
  logger.info(`setNX cache with key: ${key}`);
  return redis.set(key, value, 'EX', ttl, 'NX');
};

const setXX = async (key: string, value: any, ttl: number | string) => {
  logger.info(`setXX cache with key: ${key}`);
  return redis.set(key, value, 'EX', ttl, 'XX');
};

const get = async (key: string) => {
  logger.info(`get cache with key: ${key}`);
  const data = await redis.get(key);
  logger.info(`get redis: ${data}`);
  return data;
};

const clear = async (key: string) => {
  logger.info(`clear cache with key: ${key}`);
  const data = await redis.del(key);
  logger.info(`clear redis: ${data}`);
  return data;
};

export { set, setNX, setXX, get, clear, redis };

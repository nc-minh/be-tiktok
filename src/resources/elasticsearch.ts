import configs from 'configs';
import { Client } from '@elastic/elasticsearch';

const elasticSearchConfig = configs.elasticsearch;

const elasticSearch = elasticSearchConfig.protocol || 'http';

const userNamePwd = elasticSearchConfig.username
  ? `${elasticSearchConfig.username}:${elasticSearchConfig.pasword}@`
  : '';

const elasticSearchUrl = `${elasticSearch}://${userNamePwd}${elasticSearchConfig.host}`;

export const client = new Client({
  node: elasticSearchUrl,
});


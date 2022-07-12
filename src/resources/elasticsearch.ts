import configs from 'configs';
import { Client } from '@elastic/elasticsearch';

const elasticSearchConfig = configs.elasticsearch;

const elasticSearch = elasticSearchConfig.protocol || 'http';

const userNamePwd = elasticSearchConfig.username
  ? `${elasticSearchConfig.username}:${elasticSearchConfig.pasword}@`
  : '';

const elasticSearchHost = elasticSearchConfig.host ? elasticSearchConfig.host : 'localhost:9200';

const elasticSearchUrl = `${elasticSearch}://${userNamePwd}${elasticSearchHost}`;

export const client = new Client({
  node: elasticSearchUrl,
});

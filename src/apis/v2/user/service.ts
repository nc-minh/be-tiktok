import { Request, NextFunction } from 'express';

import { usersValidate } from 'helpers/validation';
import { UserModel } from 'models';
import { HttpException, StatusCode } from 'exceptions';
import { PAGE_SIZE, QUERY_DELETED, QUERY_IGNORE } from 'utils/constants/query';
import { client } from 'resources/elasticsearch';
import User from 'models/types/User';
import { MODELS } from 'utils/constants/models';
import { MongodbSubmitToElasticSearch } from 'libs/elasticsearch';
import { body } from 'libs/elasticsearch/settings';
import { MongoEs } from 'resources';

export const searchAllUsers = async (req: Request, next: NextFunction) => {
  const { q, type, pageSize = PAGE_SIZE, currentPage = 1 } = req.query;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const CURRENT_PAGE: number = Number(currentPage);

    if (q) {
      const result = await client.search<User>({
        index: MODELS.user.toLowerCase(),
        query: {
          match: {
            fullname: q.toString(),
          },
        },
        size: SIZE,
        from: FROM,
      });

      return {
        data: result.hits.hits,
        currentPage: CURRENT_PAGE,
        length: SIZE,
        total: result?.hits?.total,
      };
    } else {
      const result = await client.search<User>({
        index: MODELS.user.toLowerCase(),
        query: {
          match_all: {},
        },
        size: SIZE,
        from: FROM,
      });
      return { data: result.hits.hits, currentPage: CURRENT_PAGE, length: SIZE, total: result?.hits?.total };
    }
  } catch (error) {
    next(error);
  }
};

export const test = async (req: Request, next: NextFunction) => {
  const { fullname, username, id } = req.query;
  try {
    // const okok = test.createIndices({
    //   index: String(fullname),
    //   body: body,
    // });
    // const okok = test.index({
    //   fullname,
    //   password: 'admin',
    //   username,
    // });

    // const okok = MongoEs.deleteIndices({
    //   index: String(fullname),
    //   body: body,
    // });

    const okok = MongoEs.forceDelete({
      id: id?.toString() || '',
    });

    return okok;
  } catch (error) {
    next(error);
  }
};

import { Request, NextFunction } from 'express';

import { PostReactionModel } from 'models';
import { QUERY_DELETED_IGNORE, QUERY_IGNORE, PAGE_SIZE } from 'utils/constants/query';

export const getAllUserReactPost = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;
  const post_id = req.params.id;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = await PostReactionModel.find({ post_id, ...QUERY_DELETED_IGNORE })
      .populate([
        {
          path: 'post_id',
          select: 'contents media_url reaction_count view_count',
        },
        {
          path: 'user_id',
          select: 'fullname username avatar tick',
        },
      ])
      .select(QUERY_IGNORE)
      .skip(FROM)
      .limit(SIZE);

    return {
      data: result,
      currentPage: CURRENT_PAGE,
      length: SIZE,
      total: result.length,
    };
  } catch (error) {
    next(error);
  }
};

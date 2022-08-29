import { view } from 'apis/v1/posts/service';
import { HttpException, StatusCode } from 'exceptions';
import { Request, NextFunction } from 'express';

import { CommentModel, CommentReactionModel } from 'models';
import { QUERY_DELETED_IGNORE, QUERY_IGNORE, PAGE_SIZE } from 'utils/constants/query';

export const getAllCommentsOfPost = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;
  const post_id = req.params.id;
  const ipAddress: string = req.clientIp || '';
  const userLogin = req?.user;

  try {
    const isView = await view(post_id, ipAddress);
    if (!isView)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Post does not exist',
        StatusCode.BadRequest.name
      );

    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = CommentModel.find({ post_id, ...QUERY_DELETED_IGNORE })
      .populate([
        {
          path: 'user_id',
          select: 'fullname username avatar tick',
        },
      ])
      .select(QUERY_IGNORE)
      .skip(FROM)
      .limit(SIZE)
      .sort({ _id: -1 });

    const count = CommentModel.count({ ...QUERY_DELETED_IGNORE, post_id });
    const reaction = CommentReactionModel.find({ user_id: userLogin?.userID, post_id });

    const resolveAll = await Promise.all([result, count, reaction]);

    if (userLogin) {
      const newResult: any[] = [];

      for (let i = 0; i < resolveAll[0].length; i++) {
        const thisIsReaction = resolveAll[2].find((item) => {
          return item.comment_id._id.toString() === resolveAll[0][i]._id.toString();
        });

        newResult.push({
          ...resolveAll[0][i].toObject(),
          isReaction: thisIsReaction ? true : false,
        });
      }

      return {
        data: newResult,
        currentPage: CURRENT_PAGE,
        length: SIZE,
        total: resolveAll[1],
      };
    }

    return {
      data: resolveAll[0],
      currentPage: CURRENT_PAGE,
      length: SIZE,
      total: resolveAll[1],
    };
  } catch (error) {
    next(error);
  }
};

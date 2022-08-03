import { HttpException, StatusCode } from 'exceptions';
import { Request, NextFunction } from 'express';

import { UserModel, FollowModel } from 'models';
import { QUERY_LOCKED_IGNORE, QUERY_IGNORE, PAGE_SIZE, QUERY_DELETED_IGNORE } from 'utils/constants/query';

export const getAllUsers = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) : 0;

    const result = await UserModel.find({ ...QUERY_LOCKED_IGNORE })
      .select(QUERY_IGNORE)
      .skip(FROM)
      .limit(SIZE);

    const count = await UserModel.count({ ...QUERY_LOCKED_IGNORE });

    return {
      data: result,
      currentPage: CURRENT_PAGE,
      length: SIZE,
      total: count,
    };
  } catch (error) {
    next(error);
  }
};

export const searchAllUsers = async (req: Request, next: NextFunction) => {
  const { q, type, pageSize = PAGE_SIZE, currentPage = 1 } = req.query;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) : 0;

    const count = await UserModel.count({
      $text: {
        $search: String(q),
      },
      ...QUERY_LOCKED_IGNORE,
    });

    if (type === 'less') {
      const result = await UserModel.find({
        $text: {
          $search: String(q),
        },
        ...QUERY_LOCKED_IGNORE,
      })
        .select(QUERY_IGNORE)
        .limit(5);

      return {
        data: result,
        currentPage: CURRENT_PAGE,
        length: SIZE,
        total: count,
      };
    }
    const result = await UserModel.find({
      $text: {
        $search: String(q),
      },
      ...QUERY_LOCKED_IGNORE,
    })
      .select(QUERY_IGNORE)
      .skip(FROM)
      .limit(SIZE);

    return {
      data: result,
      currentPage: CURRENT_PAGE,
      length: SIZE,
      total: count,
    };
  } catch (error) {
    next(error);
  }
};

export const getUserinfo = async (req: Request, next: NextFunction) => {
  try {
    const _id = req.user.userID;

    const result = await UserModel.findOne({ _id, ...QUERY_LOCKED_IGNORE }).select(QUERY_IGNORE);

    if (!result) {
      throw new HttpException(
        'ForbiddenError',
        StatusCode.BadRequest.status,
        'Your account has been locked',
        'Locked',
        Date.now() - req.startTime
      );
    }

    return result;
  } catch (error) {
    next(error);
  }
};

export const getUserByUsername = async (req: Request, next: NextFunction) => {
  try {
    const { username } = req.params;
    const user = req.user;

    const result = await UserModel.findOne({ username, ...QUERY_LOCKED_IGNORE }).select(QUERY_IGNORE);

    if (!result) {
      throw new HttpException(
        'NotFound',
        StatusCode.BadRequest.status,
        'NotFound',
        'NotFound',
        Date.now() - req.startTime
      );
    }

    if (user && user.userID) {
      const user_id = user.userID;
      const checkFollow = await FollowModel.find({ user_id, ...QUERY_DELETED_IGNORE })
        .populate([
          {
            path: 'follow_id',
            select: 'fullname username avatar tick',
          },
          {
            path: 'user_id',
            select: 'fullname username avatar tick',
          },
        ])
        .select(QUERY_IGNORE);

      const isFollowed = checkFollow.find((element) => {
        return element.follow_id.username === username;
      });

      if (isFollowed) {
        const newResult = { ...result.toObject(), isFollow: true };

        return newResult;
      }
    }
    return { ...result.toObject(), isFollow: false };
  } catch (error) {
    next(error);
  }
};

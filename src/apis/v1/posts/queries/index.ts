import { Request, NextFunction } from 'express';

import { PostModel, UserModel } from 'models';
import { QUERY_DELETED_IGNORE, QUERY_IGNORE, PAGE_SIZE } from 'utils/constants/query';

export const getAllPosts = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = await PostModel.find({ ...QUERY_DELETED_IGNORE })
      .populate([
        {
          path: 'user_id',
          select: 'fullname username avatar tick',
        },
        {
          path: 'category_id.id',
          select: 'category_name',
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

export const getAllPostsOfUser = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;
  const user_id = req.params.id;
  const userLogin = req?.user;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    if (userLogin) {
      const result = await PostModel.find({ user_id, ...QUERY_DELETED_IGNORE })
        .populate([
          {
            path: 'category_id.id',
            select: 'category_name',
          },
        ])
        .select(QUERY_IGNORE + ' -user_id')
        .skip(FROM)
        .limit(SIZE)
        .sort({ _id: -1 });
      const user = await UserModel.findOne({ _id: user_id }).select(QUERY_IGNORE);
      return {
        data: {
          user,
          post: result,
        },
        currentPage: CURRENT_PAGE,
        length: SIZE,
        total: result.length,
      };
    }

    const result = await PostModel.find({ user_id, ...QUERY_DELETED_IGNORE })
      .populate([
        {
          path: 'category_id.id',
          select: 'category_name',
        },
      ])
      .select(QUERY_IGNORE + ' -user_id')
      .skip(FROM)
      .limit(SIZE)
      .sort({ _id: -1 });

    const user = await UserModel.findOne({ _id: user_id }).select(QUERY_IGNORE);

    return {
      data: {
        user,
        post: result,
      },
      currentPage: CURRENT_PAGE,
      length: SIZE,
      total: result.length,
    };
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;
  const post_id = req.params.id;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = await PostModel.findOne({ _id: post_id, ...QUERY_DELETED_IGNORE })
      .populate([
        {
          path: 'user_id',
          select: 'fullname username avatar tick',
        },
        {
          path: 'category_id.id',
          select: 'category_name',
        },
      ])
      .select(QUERY_IGNORE)
      .skip(FROM)
      .limit(SIZE);

    return {
      data: result,
      currentPage: CURRENT_PAGE,
      length: SIZE,
      total: result ? 1 : 0,
    };
  } catch (error) {
    next(error);
  }
};

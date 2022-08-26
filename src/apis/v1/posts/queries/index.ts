/* eslint-disable @typescript-eslint/naming-convention */
import { Request, NextFunction } from 'express';

import { PostModel, UserModel } from 'models';
import { QUERY_DELETED_IGNORE, QUERY_IGNORE, PAGE_SIZE } from 'utils/constants/query';
import { ObjectId } from 'mongodb';

export const getAllPosts = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = PostModel.find({ ...QUERY_DELETED_IGNORE })
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

    const count = PostModel.count({ ...QUERY_DELETED_IGNORE });

    const resolveAll = await Promise.all([result, count]);

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

export const getAllPostsOfUser = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;
  const user_id = req.params.id;
  const userLogin = req?.user;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    if (userLogin) {
      const ObjectUserId: any = new ObjectId(user_id);

      const result = PostModel.aggregate([
        {
          $match: { user_id: ObjectUserId },
        },
        {
          $lookup: {
            from: 'post_reaction',
            localField: '_id',
            foreignField: 'post_id',
            as: 'isReaction',
          },
        },
        {
          $project: {
            _id: 1,
            contents: 1,
            media_url: 1,
            reaction_count: 1,
            view_count: 1,
            category_id: 1,
            created_at: 1,
            updated_at: 1,
            comment_count: 1,
            isReaction: {
              $filter: {
                input: '$isReaction',
                cond: {
                  $eq: ['$$this.user_id', ObjectUserId],
                },
              },
            },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      const user = UserModel.findOne({ _id: user_id }).select(QUERY_IGNORE);
      const count = PostModel.count({ user_id, ...QUERY_DELETED_IGNORE });

      const resolveAll = await Promise.all([result, count, user]);

      return {
        data: {
          user: resolveAll[2],
          post: resolveAll[0],
        },
        currentPage: CURRENT_PAGE,
        length: SIZE,
        total: resolveAll[1],
      };
    }

    const result = PostModel.find({ user_id, ...QUERY_DELETED_IGNORE })
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

    const user = UserModel.findOne({ _id: user_id }).select(QUERY_IGNORE);
    const count = PostModel.count({ user_id, ...QUERY_DELETED_IGNORE });

    const resolveAll = await Promise.all([result, count, user]);

    return {
      data: {
        user: resolveAll[2],
        post: resolveAll[0],
      },
      currentPage: CURRENT_PAGE,
      length: SIZE,
      total: resolveAll[1],
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

export const getPostTrends = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = PostModel.find({ ...QUERY_DELETED_IGNORE })
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
      .limit(SIZE)
      .sort({ _id: -1, view_count: -1, reaction_count: -1 });

    const count = PostModel.count({ ...QUERY_DELETED_IGNORE });

    const resolveAll = await Promise.all([result, count]);

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

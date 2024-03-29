/* eslint-disable prettier/prettier */
import { Request, NextFunction } from 'express';

import { CategoryModel, PostModel } from 'models';
import { QUERY_DELETED_IGNORE, QUERY_IGNORE, PAGE_SIZE } from 'utils/constants/query';

export const getAllCategories = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = CategoryModel.find({ ...QUERY_DELETED_IGNORE })
      .select(QUERY_IGNORE)
      .skip(FROM)
      .limit(SIZE);

    const count = CategoryModel.count({ ...QUERY_DELETED_IGNORE });

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

export const getAllPostsOfCategory = async (req: Request, next: NextFunction) => {
  const { pageSize = PAGE_SIZE, currentPage = 1 } = req.query;
  const category_id = req.params.id;

  try {
    const SIZE = Number(pageSize);
    const FROM = currentPage !== 1 ? Number(currentPage) * SIZE : 0;
    const CURRENT_PAGE: number = currentPage !== 1 ? Number(currentPage) * SIZE : 0;

    const result = await PostModel.find({
      category_id: {
        $elemMatch: {
          id: category_id,
        },
      },
      ...QUERY_DELETED_IGNORE,
    })
      .populate([
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

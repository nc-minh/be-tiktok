import { NextFunction, Request } from 'express';

import { HttpException, StatusCode } from 'exceptions';
import { categoryValidate, updateCategoryValidate } from 'helpers/validation';
import { CategoryModel } from 'models';

export const createCategory = async (req: Request, next: NextFunction) => {
  const { category_name } = req.body;
  const { error } = categoryValidate(req.body);
  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const isExits = await CategoryModel.findOne({
      category_name,
    });

    if (isExits) {
      return next(
        new HttpException('CreateError', StatusCode.BadRequest.status, 'Category is aready', StatusCode.BadRequest.name)
      );
    }

    const result = await CategoryModel.create({ category_name });

    return result;
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, next: NextFunction) => {
  const { category_name, category_id } = req.body;
  const { error } = updateCategoryValidate(req.body);

  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const updateDoc = {
      $set: {
        category_name,
      },
    };

    const result = await CategoryModel.findOneAndUpdate({ _id: category_id }, updateDoc);

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Category does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

export const forceDeleteCategory = async (req: Request, next: NextFunction) => {
  const { category_id } = req.body;

  try {
    const result = await CategoryModel.findOneAndDelete({ _id: category_id });

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Category does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

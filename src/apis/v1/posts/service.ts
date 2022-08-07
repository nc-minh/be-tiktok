import { NextFunction, Request } from 'express';

import { HttpException, StatusCode } from 'exceptions';
import { postValidate, updatePostValidate } from 'helpers/validation';
import { PostModel } from 'models';
import { MongooseCustom } from 'libs/mongodb';
import { Cloudinary } from 'utils/uploads';

export const createPost = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;
  const media_url = req.files?.media_url;

  const reqBody = {
    ...req.body,
    user_id: userID,
  };
  const { error } = postValidate(reqBody);
  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const cloudinary = new Cloudinary();
    if (Array.isArray(media_url)) {
      throw new HttpException(
        'TypeError',
        StatusCode.BadRequest.status,
        'Array is not allowed',
        StatusCode.BadRequest.name
      );
    }

    const data = await cloudinary.uploads(media_url, 'auto');
    console.log(data);

    const reqBodyWithMedia = {
      ...req.body,
      user_id: userID,
      media_url: data && data.url,
    };

    const result = await PostModel.create(data ? reqBodyWithMedia : reqBody);

    return result;
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;
  const media_url = req.files?.media_url;

  const reqBody = {
    ...req.body,
    user_id: userID,
  };
  const { error } = updatePostValidate(reqBody);
  const { post_id, contents, category_id } = req.body;

  try {
    const cloudinary = new Cloudinary();
    if (Array.isArray(media_url)) {
      throw new HttpException(
        'TypeError',
        StatusCode.BadRequest.status,
        'Array is not allowed',
        StatusCode.BadRequest.name
      );
    }

    const data = await cloudinary.uploads(media_url, 'auto');

    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const updateDoc = {
      $set: {
        contents,
        media_url: data && data.url,
        category_id,
      },
    };

    const result = await PostModel.findOneAndUpdate({ _id: post_id }, updateDoc);

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Post does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

export const softDeletePost = async (req: Request, next: NextFunction) => {
  const { post_id } = req.body;

  try {
    const mongooseCustom = new MongooseCustom(PostModel);
    const result = await mongooseCustom.findOneAndSoftDelete(post_id);

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Post does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

export const restorePost = async (req: Request, next: NextFunction) => {
  const { post_id } = req.body;

  try {
    const mongooseCustom = new MongooseCustom(PostModel);
    const result = await mongooseCustom.findOneAndRestore(post_id);

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Post does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

export const forceDeletePost = async (req: Request, next: NextFunction) => {
  const { post_id } = req.body;

  try {
    const result = await PostModel.findOneAndDelete({ _id: post_id });

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Post does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

export const view = async (post_id: string) => {
  const updateDoc = { $inc: { view_count: 1 } };
  const result = await PostModel.findByIdAndUpdate({ _id: post_id }, updateDoc);
  return result;
};

export const viewPost = async (req: Request, next: NextFunction) => {
  const { post_id } = req.body;

  try {
    const result = await view(post_id);

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Post does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

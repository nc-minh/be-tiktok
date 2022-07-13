import { NextFunction, Request } from 'express';

import { HttpException, StatusCode } from 'exceptions';
import { postValidate } from 'helpers/validation';
import PostModel from 'models/schemas/Post';
import { MongooseCustom } from 'libs/mongodb';

export const createPost = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;

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

    const result = await PostModel.create(reqBody);

    return result;
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;

  const reqBody = {
    ...req.body,
    user_id: userID,
  };
  const { error } = postValidate(reqBody);
  const { post_id, contents, media_url, categody_id } = req.body;

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
        contents,
        media_url,
        categody_id,
      },
    };

    const result = await PostModel.findOneAndUpdate({ _id: post_id }, updateDoc);
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
    return result;
  } catch (error) {
    next(error);
  }
};

export const forceDeletePost = async (req: Request, next: NextFunction) => {
  const { post_id } = req.body;

  try {
    const result = await PostModel.findOneAndDelete({ _id: post_id });
    return result;
  } catch (error) {
    next(error);
  }
};
import { NextFunction, Request } from 'express';
import { ObjectId } from 'mongodb';

import { HttpException, StatusCode } from 'exceptions';
import { postReactionValidate } from 'helpers/validation';
import { PostReactionModel, PostModel } from 'models';

export const postReaction = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;
  const reqBody = {
    ...req.body,
    user_id: userID,
  };

  const { post_id } = req.body;

  const { error } = postReactionValidate(reqBody);
  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const isPost = await PostModel.findOne({ _id: post_id });

    if (!isPost) {
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Post is not exists',
        StatusCode.BadRequest.name
      );
    }

    const isExits = await PostReactionModel.findOne({
      post_id,
      user_id: userID,
    });

    if (isExits) {
      const deleteId = new ObjectId(isExits._id);
      const result = PostReactionModel.findByIdAndDelete({ _id: deleteId });
      const updateDoc = { $inc: { reaction_count: -1 } };

      const resolveAll = await Promise.all([result, PostModel.findByIdAndUpdate({ _id: post_id }, updateDoc)]);

      return { ...resolveAll[0]?.toObject(), unReaction: true };
    }

    const result = PostReactionModel.create(reqBody);
    const updateDoc = { $inc: { reaction_count: 1 } };

    const resolveAll = await Promise.all([result, PostModel.findByIdAndUpdate({ _id: post_id }, updateDoc)]);

    return resolveAll[0];
  } catch (error) {
    next(error);
  }
};

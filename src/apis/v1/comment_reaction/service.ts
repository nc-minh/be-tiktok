import { NextFunction, Request } from 'express';
import { ObjectId } from 'mongodb';

import { HttpException, StatusCode } from 'exceptions';
import { commentReactionValidate } from 'helpers/validation';
import { CommentReactionModel, CommentModel } from 'models';

export const commentReaction = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;
  const reqBody = {
    ...req.body,
    user_id: userID,
  };

  const { comment_id } = req.body;

  const { error } = commentReactionValidate(reqBody);
  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const isExits = await CommentReactionModel.findOne({
      comment_id,
      user_id: userID,
    });

    if (isExits) {
      const deleteId = new ObjectId(isExits._id);
      const result = await CommentReactionModel.findByIdAndDelete({ _id: deleteId });
      const updateDoc = { $inc: { comment_reaction_count: -1 } };
      await CommentModel.findByIdAndUpdate({ _id: comment_id }, updateDoc);

      return result;
    }

    const result = await CommentReactionModel.create(reqBody);
    const updateDoc = { $inc: { comment_reaction_count: 1 } };
    await CommentModel.findByIdAndUpdate({ _id: comment_id }, updateDoc);

    return result;
  } catch (error) {
    next(error);
  }
};

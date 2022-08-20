import { NextFunction, Request } from 'express';

import { HttpException, StatusCode } from 'exceptions';
import { commentValidate, updateCommentValidate } from 'helpers/validation';
import { CommentModel, PostModel } from 'models';

export const createComment = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;
  const { post_id } = req.body;
  const reqBody = {
    ...req.body,
    user_id: userID,
  };

  const { error } = commentValidate(reqBody);
  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const result = await CommentModel.create(reqBody);

    const comment_id = result.toObject()._id;

    const updateDocPost = { $inc: { comment_count: 1 } };

    const update_comment_count = await PostModel.findByIdAndUpdate({ _id: post_id }, updateDocPost);

    if (!update_comment_count) {
      await CommentModel.findByIdAndDelete({ _id: comment_id });
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        'Post does not exist',
        StatusCode.BadRequest.name
      );
    }
    return result;
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req: Request, next: NextFunction) => {
  const { contents, media_url } = req.body;
  const comment_id = req.params.id;

  const user = req.user;
  const userID = user.userID;

  const reqBody = {
    ...req.body,
    comment_id: comment_id,
  };
  const { error } = updateCommentValidate(reqBody);

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
      },
    };

    const userVerification = await CommentModel.findOne({ _id: comment_id });

    if (userVerification?.user_id.toString() !== userID && userVerification?.user_id) {
      throw new HttpException(
        'AuthenticationError',
        StatusCode.BadRequest.status,
        'This comment does not belong to you',
        StatusCode.BadRequest.name
      );
    }

    const result = await CommentModel.findOneAndUpdate({ _id: comment_id }, updateDoc);

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Comment does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

export const forceDeleteComment = async (req: Request, next: NextFunction) => {
  const comment_id = req.params.id;
  const user = req.user;
  const userID = user.userID;

  try {
    const userVerification = await CommentModel.findOne({ _id: comment_id });

    if (userVerification?.user_id.toString() !== userID && userVerification?.user_id) {
      throw new HttpException(
        'AuthenticationError',
        StatusCode.BadRequest.status,
        'This comment does not belong to you',
        StatusCode.BadRequest.name
      );
    }

    const result = await CommentModel.findOneAndDelete({ _id: comment_id });

    const post_id = result?.toObject()?.post_id;

    if (post_id) {
      const updateDocPost = { $inc: { comment_count: -1 } };
      await PostModel.findByIdAndUpdate({ _id: post_id }, updateDocPost);
    }

    if (!result)
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'Comment does not exist',
        StatusCode.BadRequest.name
      );

    return result;
  } catch (error) {
    next(error);
  }
};

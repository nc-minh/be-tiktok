import { NextFunction, Request } from 'express';
import { ObjectId } from 'mongodb';

import { HttpException, StatusCode } from 'exceptions';
import { followValidate } from 'helpers/validation';
import { FollowModel, UserModel } from 'models';

export const follow = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;
  const reqBody = {
    ...req.body,
    user_id: userID,
  };

  const { follow_id } = req.body;

  const { error } = followValidate(reqBody);
  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    if (follow_id === userID) {
      throw new HttpException(
        'SpamError',
        StatusCode.BadRequest.status,
        'Can not follow yourself',
        StatusCode.BadRequest.name
      );
    }

    const isUser = await UserModel.findOne({ _id: follow_id });

    if (!isUser) {
      throw new HttpException(
        'NotFoundError',
        StatusCode.BadRequest.status,
        'User is not exists',
        StatusCode.BadRequest.name
      );
    }
    const isExits = await FollowModel.findOne({
      follow_id,
      user_id: userID,
    });

    if (isExits) {
      const deleteId = new ObjectId(isExits._id);
      const result = await FollowModel.findByIdAndDelete({ _id: deleteId });
      const updateDocFollower = { $inc: { followers_count: -1 } };
      const updateDocFollowing = { $inc: { followings_count: -1 } };
      await UserModel.findByIdAndUpdate({ _id: userID }, updateDocFollowing);
      await UserModel.findByIdAndUpdate({ _id: follow_id }, updateDocFollower);

      return result;
    }

    const result = await FollowModel.create(reqBody);
    const updateDocFollower = { $inc: { followers_count: 1 } };
    const updateDocFollowing = { $inc: { followings_count: 1 } };
    await UserModel.findByIdAndUpdate({ _id: userID }, updateDocFollowing);
    await UserModel.findByIdAndUpdate({ _id: follow_id }, updateDocFollower);

    return result;
  } catch (error) {
    next(error);
  }
};

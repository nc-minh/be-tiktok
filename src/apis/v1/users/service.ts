import { Request, NextFunction } from 'express';

import { usersValidate } from 'helpers/validation';
import { UserModel } from 'models';
import { HttpException, StatusCode } from 'exceptions';
import { MongooseCustom } from 'libs/mongodb';
import { Cloudinary } from 'utils/uploads';

export const updateAvatar = async (req: Request, next: NextFunction) => {
  const avatar = req.files?.avatar;
  const user = req.user;
  const userID = user.userID;
  console.log(avatar);

  try {
    const cloudinary = new Cloudinary();

    if (Array.isArray(avatar)) {
      throw new HttpException(
        'TypeError',
        StatusCode.BadRequest.status,
        'Array is not allowed',
        StatusCode.BadRequest.name
      );
    }

    const data = await cloudinary.uploads(avatar);
    if (data.error === 'type_error') {
      throw new HttpException(
        'TypeError',
        StatusCode.BadRequest.status,
        'Video is not allowed',
        StatusCode.BadRequest.name
      );
    }
    const updateDoc = {
      $set: {
        avatar: data ? data.url : undefined,
      },
    };

    const result = await UserModel.findOneAndUpdate({ _id: userID }, updateDoc);
    return result;
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, next: NextFunction) => {
  const { error } = usersValidate(req.body);
  const { fullname, username, avatar, bio, website_url, social_network } = req.body;
  const user = req.user;
  const userID = user.userID;

  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const isExits = await UserModel.findOne({
      username,
    });

    const userIdFound = isExits?._id.toString();

    if (isExits && userIdFound !== userID) {
      return next(
        new HttpException('CreateError', StatusCode.BadRequest.status, 'Username is aready', StatusCode.BadRequest.name)
      );
    }

    const updateDoc = {
      $set: {
        fullname,
        username,
        avatar,
        bio,
        website_url,
        social_network,
      },
    };

    const result = await UserModel.findOneAndUpdate({ _id: userID }, updateDoc);
    return result;
  } catch (error) {
    next(error);
  }
};

export const disableUser = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;

  try {
    const mongooseCustom = new MongooseCustom(UserModel);
    const result = await mongooseCustom.findOneAndDisable(userID);
    return result;
  } catch (error) {
    next(error);
  }
};

export const enableUser = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;

  try {
    const mongooseCustom = new MongooseCustom(UserModel);
    const result = await mongooseCustom.findOneAndEnable(userID);
    return result;
  } catch (error) {
    next(error);
  }
};

export const softDeleteUser = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;

  try {
    const mongooseCustom = new MongooseCustom(UserModel);
    const result = await mongooseCustom.findOneAndSoftDelete(userID);
    return result;
  } catch (error) {
    next(error);
  }
};

export const restoreUser = async (req: Request, next: NextFunction) => {
  const user = req.user;
  const userID = user.userID;

  try {
    const mongooseCustom = new MongooseCustom(UserModel);
    const result = await mongooseCustom.findOneAndRestore(userID);
    return result;
  } catch (error) {
    next(error);
  }
};

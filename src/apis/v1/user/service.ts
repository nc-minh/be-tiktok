import { Request, NextFunction } from 'express';

import { usersValidate } from 'helpers/validation';
import { UserModel } from 'models';
import { HttpException, StatusCode } from 'exceptions';
import { QUERY_DELETED } from 'utils/constants/query';

export const createUser = async (req: Request, next: NextFunction) => {
  const { error } = usersValidate(req.body);
  const { username } = req.body;
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

    if (isExits) {
      return next(
        new HttpException('CreateError', StatusCode.BadRequest.status, 'Username is aready', StatusCode.BadRequest.name)
      );
    }

    const user = new UserModel(req.body);

    const result = await user.save();

    return result;
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, next: NextFunction) => {
  const { error } = usersValidate(req.body);
  const { fullname, nickname, avatar, bio, website_url, social_network } = req.body;
  const username = req.params.username;

  try {
    if (error)
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );

    const result = await UserModel.findOneAndUpdate({});
  } catch (error) {}
};

export const randomUsers = async (req: Request, next: NextFunction) => {
  const { username } = req.body;
  try {
    return null;
  } catch (error) {
    next(error);
  }
};


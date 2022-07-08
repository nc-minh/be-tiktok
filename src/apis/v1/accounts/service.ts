import { Request, NextFunction } from 'express';

import { usersValidate } from 'helpers/validation';
import { AccountsModel } from 'models';
import { HttpException, StatusCode } from 'exceptions';
import { QUERY_DELETED } from 'utils/constants/query';

export const createAccounts = async (req: Request, next: NextFunction) => {
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

    const isExits = await AccountsModel.findOne({
      username,
    });

    if (isExits) {
      return next(
        new HttpException('CreateError', StatusCode.BadRequest.status, 'Username is aready', StatusCode.BadRequest.name)
      );
    }

    const accounts = new AccountsModel(req.body);

    const result = await accounts.save();

    return result;
  } catch (error) {
    next(error);
  }
};

export const updateAccounts = async (req: Request, next: NextFunction) => {
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

    const result = await AccountsModel.findOneAndUpdate({});
  } catch (error) {}
};

export const randomUsers = async (req: Request, next: NextFunction) => {
  const { username } = req.body;
  try {
    // const accounts = new AccountsModel(req.body);
    // const result = await accounts.save();
    return null;
  } catch (error) {
    next(error);
  }
};


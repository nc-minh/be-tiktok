import { Request, NextFunction } from 'express';
import { usersValidate } from 'Helpers/validation';
import { AccountsModel } from 'models';

const createAccount = async (req: Request, next: NextFunction) => {
  const { error } = usersValidate(req.body);

  if (error) {
    console.log(error);

    next(error);
  } else {
    const result = await AccountsModel.create(req.body);

    return result;
  }
};

export { createAccount };

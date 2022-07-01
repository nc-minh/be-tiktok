import { HttpException, StatusCode } from 'exceptions';

import { NextFunction, Request, Response } from 'express';
import { usersValidate } from 'Helpers/validation';
import { ApiResponse } from 'utils/rest';
import { AccountsModel } from 'models';

const loginAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  //   const result = await service.getHome();
  //   new ApiResponse(result).send(res);
  const { username, password } = req.body;

  try {
    const { error } = usersValidate(req.body);
    if (error) {
      throw new HttpException(
        'ValidateError',
        StatusCode.BadRequest.status,
        error.details[0].message,
        StatusCode.BadRequest.name
      );
    }

    if (!username || !password) {
      return next(
        new HttpException(
          'MissingError',
          StatusCode.BadRequest.status,
          'Missing username or password',
          StatusCode.BadRequest.name
        )
      );
    }

    const user = await AccountsModel.findOne({ username });
    if (!user) {
      throw new HttpException(
        'NotFoundError',
        StatusCode.NotFound.status,
        'User not registered!',
        StatusCode.NotFound.name
      );
    }

    const isValid = await user.schema.methods.isCheckPassword(password);
    console.log(isValid);

    return isValid;
  } catch (error) {
    next(error);
  }
};

export { loginAuthMiddleware };

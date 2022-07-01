import { NextFunction, Request } from 'express';

import { HttpException, StatusCode } from 'exceptions';
import { loginValidate } from 'Helpers/validation';
import { AccountsModel } from 'models';
import { signAccessToken, signRefreshToken } from 'Helpers/jwt';

const login = async (req: Request, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const { error } = loginValidate(req.body);
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

    const isValid = await user.schema.methods.isCheckPassword(password, user);
    if (!isValid) {
      throw new HttpException(
        'NotFoundError',
        StatusCode.Unauthorized.status,
        'Incorrect password',
        StatusCode.Unauthorized.name
      );
    }

    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    return {
      token: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    next(error);
  }
};

export { login };

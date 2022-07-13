import { NextFunction, Request } from 'express';

import { HttpException, StatusCode } from 'exceptions';
import { loginValidate } from 'helpers/validation';
import { UserModel } from 'models';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from 'helpers/jwt';
import { RefreshTokenPayload } from 'types/auth';

export const login = async (req: Request, next: NextFunction) => {
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

    const lockedUser = await UserModel.findOne({ username });

    if (lockedUser?.is_deleted === true) {
      throw new HttpException(
        'LockedError',
        StatusCode.NotFound.status,
        'Your account has been locked',
        StatusCode.NotFound.name
      );
    }

    if (lockedUser?.is_enabled === false) {
      const accessToken = await signAccessToken(lockedUser._id, lockedUser.role);
      const refreshToken = await signRefreshToken(lockedUser._id, lockedUser.role);
      return {
        token: {
          accessToken,
          refreshToken,
        },
        message: 'Your account has been disabled',
        statusCode: 'DISABLED',
      };
    }

    const user = await UserModel.findOne({ username });
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

    const accessToken = await signAccessToken(user._id, user.role);
    const refreshToken = await signRefreshToken(user._id, user.role);

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

export const refreshToken = async (req: Request, next: NextFunction) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      throw new HttpException(
        'NotFoundError',
        StatusCode.NotFound.status,
        'Missing refreshToken',
        StatusCode.NotFound.name
      );
    }

    const payload: RefreshTokenPayload | any = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(payload.userID, payload.role);
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    next(error);
  }
};

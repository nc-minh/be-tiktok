import { NextFunction, Request, Response } from 'express';

import { HttpException, StatusCode } from 'exceptions';
import JWT from 'jsonwebtoken';
import configs from 'configs';

export const loginAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['authorization']) {
      throw new HttpException(
        'AuthenticationError',
        StatusCode.Unauthorized.status,
        'You are not logged in',
        StatusCode.Unauthorized.name
      );
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    const verify = JWT.verify(token, configs.jwt.accessTokenSecret);
    req.user = verify;
    next();
  } catch (error: any) {
    next({
      name: error.name,
      message: error.message,
      status: StatusCode.Unauthorized.status,
    });
  }
};

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['authorization']) {
      throw new HttpException(
        'AuthorizationError',
        StatusCode.Unauthorized.status,
        'You are not logged in',
        StatusCode.Unauthorized.name
      );
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    const verify = JWT.verify(token, configs.jwt.accessTokenSecret);
    req.user = verify;
    if (req.user.role === 'admin') {
      next();
    } else {
      throw new HttpException(
        'AuthorizationError',
        StatusCode.Unauthorized.status,
        'You are not admin',
        StatusCode.Unauthorized.name
      );
    }
  } catch (error: any) {
    next({
      name: error.name,
      message: error.message,
      status: StatusCode.Unauthorized.status,
    });
  }
};

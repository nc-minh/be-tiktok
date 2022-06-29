import { NextFunction, Request, Response } from 'express';

export const asyncRouteHandler = (fn: (arg0: Request, arg1: Response, arg2: NextFunction) => any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

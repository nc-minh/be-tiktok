import { NextFunction, Request, Response } from 'express';

import { ApiResponse, Meta } from 'utils/rest';
import * as service from './service';
import * as queries from './queries';

export const follow = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.follow(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getFollower = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getFollower(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const getFollowing = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getFollowing(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

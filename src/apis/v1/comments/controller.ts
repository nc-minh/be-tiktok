import { NextFunction, Request, Response } from 'express';

import { ApiResponse, Meta } from 'utils/rest';
import * as service from './service';
import * as queries from './queries';

export const createComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createComment(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const updateComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.updateComment(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const forceDeleteComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.forceDeleteComment(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getAllCommentsOfPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getAllCommentsOfPost(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

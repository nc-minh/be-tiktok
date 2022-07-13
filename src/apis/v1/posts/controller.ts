import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from 'utils/rest';
import * as service from './service';

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createPost(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.updatePost(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const softDeletePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.softDeletePost(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const restorePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.restorePost(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const forceDeletePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.forceDeletePost(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

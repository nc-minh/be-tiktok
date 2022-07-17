import { NextFunction, Request, Response } from 'express';

import { ApiResponse, Meta } from 'utils/rest';
import * as service from './service';
import * as queries from './queries';

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createCategory(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.updateCategory(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const forceDeleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.forceDeleteCategory(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getAllCategories(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const getAllPostsOfCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getAllPostsOfCategory(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

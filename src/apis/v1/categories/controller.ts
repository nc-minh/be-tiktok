import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from 'utils/rest';
import * as service from './service';

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
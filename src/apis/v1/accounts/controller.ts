import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from 'utils/rest';
import * as service from './service';
import * as queues from './queues';

export const createAccounts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createAccounts(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.getAllUsers(next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const searchAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.searchAllUsers(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getUserinfo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.getUserinfo(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const randomUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.randomUsers(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};


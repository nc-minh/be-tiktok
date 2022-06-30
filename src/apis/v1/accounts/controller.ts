import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from 'utils/rest';
import * as service from './service';
import * as queues from './queues';

const createAccounts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createAccounts(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.getAllUsers(next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

const searchAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.searchAllUsers(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export { createAccounts, getAllUsers, searchAllUsers };

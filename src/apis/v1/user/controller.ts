import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from 'utils/rest';
import * as service from './service';
import * as queues from './queues';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createUser(req, next);
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

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.updateUser(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const softDeleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.softDeleteUser(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const restoreUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.restoreUser(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};
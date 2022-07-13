import { NextFunction, Request, Response } from 'express';

import { ApiResponse, Meta } from 'utils/rest';
import * as service from './service';
import * as queues from './queues';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createUser(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.getAllUsers(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const searchAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.searchAllUsers(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const getUserinfo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queues.getUserinfo(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.updateUser(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const disableUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.disableUser(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const enableUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.enableUser(req, next);
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
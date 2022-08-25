import { NextFunction, Request, Response } from 'express';

import { ApiResponse, Meta } from 'utils/rest';
import * as service from './service';
import * as queries from './queries';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getAllUsers(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const searchAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.searchAllUsers(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const getUserinfo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getUserinfo(req, next);
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

export const updateAvatar = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.updateAvatar(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getUserByUsername(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getSuggestedAccounts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getSuggestedAccounts(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

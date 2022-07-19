import { NextFunction, Request, Response } from 'express';

import { ApiResponse, Meta } from 'utils/rest';
import * as service from './service';
import * as queries from './queries';

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

export const getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getAllPosts(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const getAllPostsOfUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getAllPostsOfUser(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const getPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getPost(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};

export const viewPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.viewPost(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

import { NextFunction, Request, Response } from 'express';

import { ApiResponse } from 'utils/rest';
import * as service from './service';

const createAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.createAccount(req, next);
  new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export { createAccount };

import { NextFunction, Request, Response } from 'express';

import { HttpException } from 'exceptions';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const errorCode = error.errorCode || 'ERROR_CODE_NOT_FOUND';

  res.json({
    name: error.name,
    message: error.message,
    status: error.status,
    errorCode: errorCode,
  });
};

export { errorMiddleware };

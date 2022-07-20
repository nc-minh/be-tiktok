import express from 'express';

declare global {
  namespace Express {
    interface Request {
      startTime: number;
      user: any;
      files: any;
    }
  }
}

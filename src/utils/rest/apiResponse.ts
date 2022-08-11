import { Response } from 'express';
export class ApiResponse<T> {
  data: T = {} as T;
  message = 'Successfully!';
  status = 200;
  time?: number;
  meta?: T;

  constructor(data?: T, message?: string, status?: number, time?: number, meta?: T) {
    data && (this.data = data);
    message && (this.message = message);
    status && (this.status = status);
    time && (this.time = time);
    meta ? (this.meta = meta) : undefined;
  }

  public send(res: Response): void {
    if (this.meta) {
      res.status(this.status).json({
        data: this.data,
        message: this.message,
        status: this.status,
        time: this.time,
        meta: this.meta,
      });
    } else {
      res.status(this.status).json({
        data: this.data,
        message: this.message,
        status: this.status,
        time: this.time,
      });
    }
  }
}

export class Meta<T> {
  currentPage?: T;
  length?: T;
  total?: T;

  constructor(currentPage: T, length: T, total: T) {
    currentPage && (this.currentPage = currentPage);
    length && (this.length = length);
    total && (this.total = total);
  }
}

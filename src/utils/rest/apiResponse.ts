import { Response } from 'express';
export class ApiResponse<T> {
  data: T = {} as T;
  message: string = 'Successfully!';
  status: number = 200;
  time?: number;

  constructor(data?: T, message?: string, status?: number, time?: number) {
    data && (this.data = data);
    message && (this.message = message);
    status && (this.status = status);
    time && (this.time = time);
  }

  public send(res: Response): void {
    res.status(this.status).json({
      data: this.data,
      message: this.message,
      status: this.status,
      time: this.time,
    });
  }
}

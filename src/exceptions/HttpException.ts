class HttpException extends Error {
  public name: string;

  public status: number;

  public message: string;

  public errorCode?: string;

  public time?: number;

  constructor(name: string, status: number, message: string, errorCode?: string, time?: number) {
    super(message);
    this.name = name;
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
    this.time = time;
  }
}

export default HttpException;

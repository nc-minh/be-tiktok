class HttpException extends Error {
  public status: number;

  public message: string;

  public errorCode: string;

  constructor(status: number, message: string, errorCode: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export default HttpException;

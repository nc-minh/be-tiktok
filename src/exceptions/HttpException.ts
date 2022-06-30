class HttpException extends Error {
  public name: string;

  public status: number;

  public message: string;

  public errorCode: string;

  constructor(name:string, status: number, message: string, errorCode: string) {
    super(message);
    this.name = name;
    this.status = status;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export default HttpException;

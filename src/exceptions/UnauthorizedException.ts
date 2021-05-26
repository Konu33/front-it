export default class UnauthorizedException extends Error {
  constructor(message: string = 'Unauthorized access to resource.') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, UnauthorizedException);
  }
}

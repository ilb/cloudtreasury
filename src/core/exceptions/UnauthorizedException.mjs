import Exception from './Exception.mjs';

export default class UnauthorizedException extends Exception {
  constructor() {
    super();
    this.type = 'UNAUTHORIZED';
    this.status = 403;
    this.message = 'Unauthorized';
  }
}
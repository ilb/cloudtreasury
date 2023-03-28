import Exception from './Exception.mjs';

export default class ForbiddenException extends Exception {
  constructor(message = 'Доступ запрещен!') {
    super();
    this.type = 'FORBIDDEN';
    this.status = 403;
    this.message = message;
  }
}
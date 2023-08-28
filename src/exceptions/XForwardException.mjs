import Exception from "../core/exceptions/Exception.mjs";

export default class DatabaseException extends Exception {
  constructor(message = 'Rejected by x-forward-secret') {
    super();
    this.type = 'REJECTED';
    this.status = 403;
    this.message = message;
  }
}

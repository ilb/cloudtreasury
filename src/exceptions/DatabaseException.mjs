import Exception from "../core/exceptions/Exception.mjs";

export default class DatabaseException extends Exception {
  constructor(message) {
    super();
    this.type = 'CRITICAL';
    this.status = 403;
    this.message = message;
  }
}

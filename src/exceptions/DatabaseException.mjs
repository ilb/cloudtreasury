import Exception from "../core/exceptions/Exception.mjs";

export default class DatabaseException extends Exception {
  constructor(message) {
    super();
    this.type = 'DATABASE';
    this.status = 500;
    this.message = message;
  }

}

import Exception from "../core/exceptions/Exception.mjs";

export default class DatabaseException extends Exception {
  constructor(message = 'Нет доступа к базе данных.') {
    super();
    this.type = 'CRITICAL';
    this.status = 500;
    this.message = message;
  }
}

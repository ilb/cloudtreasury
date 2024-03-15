import Exception from "../core/exceptions/Exception.mjs";

export default class XForwardException extends Exception {
  constructor(message = 'Rejected x-forward-secret') {
    super();
    this.type = 'REJECTED';
    this.status = 403;
    this.message = message;
  }
}

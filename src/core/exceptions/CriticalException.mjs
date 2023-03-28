import Exception from './Exception.mjs';

export default class CriticalException extends Exception {
  constructor(message) {
    super();
    this.type = 'CRITICAL';
    this.status = 500;
    this.message = message;
  }
}
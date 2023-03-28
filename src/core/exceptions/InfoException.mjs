import Exception from './Exception.mjs';

export default class InfoException extends Exception {
  constructor(message) {
    super();
    this.type = 'INFO';
    this.status = 412;
    this.message = message;
  }
}
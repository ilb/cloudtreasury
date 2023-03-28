import Exception from './Exception.mjs';

export default class PageNotFoundException extends Exception {
  constructor() {
    super();
    this.type = 'PAGE_NOT_FOUND';
    this.status = 404;
    this.message = 'Page not found';
  }
}
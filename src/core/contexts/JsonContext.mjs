import Context from './Context.mjs';
import { getSession } from 'next-auth/react';
import ContextTypes from './ContextTypes.mjs';

export default class JsonContext extends Context {
  static type = ContextTypes.PAGE;

  static async build({ req, res, next }) {
    return {
      type: this.type,
      request: this.buildRequest(req),
      headers: req.headers,
      url: req.url,
      res: res,
      req: req,
      next: next,
      session: await getSession({req, res}),
    };
  }
}

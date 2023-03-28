import Context from './Context.mjs';
import { getSession } from 'next-auth/react';
import ContextTypes from './ContextTypes.mjs';

export default class PageContext extends Context {
  static type = ContextTypes.PAGE;

  static async build(context) {
    return {
      type: this.type,
      request: this.buildRequest(context),
      headers: context.req.headers,
      url: context.resolvedUrl || context.req.url,
      req: context.req,
      res: context.res,
      session: await getSession(context),
    };
  }
}

import Middleware from '../core/Middleware.mjs';
import xforwardCheck from "../utils/xForwardCheck.mjs";

export default class XForwardMiddleware extends Middleware {
  async process(data, context) {
    console.log('xforwardCheck', 'hello')
    xforwardCheck(context);
  }
}




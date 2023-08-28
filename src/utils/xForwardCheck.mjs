import createDebug from 'debug';
import XForwardException from '../exceptions/XForwardException.mjs';

const debug = createDebug('cloudtreasury');
const X_FORWARD_SECRET = process.env['X-FORWARD-SECRET'];
const production = process.env.ILB_SYSID == 'PRODUCTION';

const xforwardCheck = (req) => {
  if (
    production &&
    (req.headers['x-forward-secret'] == undefined ||
      req.headers['x-forward-secret'] !== X_FORWARD_SECRET)
  ) {
    debug(
      `X-FORWARD-SECRET rejected: header ${req.headers['x-forward-secret']}, env ${X_FORWARD_SECRET}`
    );

    throw new XForwardException();
  }
};

export default xforwardCheck;

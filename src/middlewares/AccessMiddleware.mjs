import UnauthorizedException from '../core/exceptions/UnauthorizedException.mjs';
import ForbiddenException from '../core/exceptions/ForbiddenException.mjs';
import Middleware from '../core/Middleware.mjs';
import LdapUnauthorizedException from '../exceptions/LdapUnauthorizedException.mjs';
import AuthHelper from '../helpers/AuthHelper.mjs';

export default class AccessMiddleware extends Middleware {
  constructor({ user }) {
    super();
    this.user = user;
  }

  async process(permission, context) {
    if (permission) {
      if (!this.user) {
        if (context?.headers['x-remote-user']) {
          throw new LdapUnauthorizedException(context.url);
        }

        throw new UnauthorizedException(context.url);
      }

      if (permission === 'auth') {
        return;
      }
    }

    const permissions = AuthHelper.getUserPermissions(this.user);

    if (!permissions.includes(permission)) {
      throw new ForbiddenException();
    }
  }

}
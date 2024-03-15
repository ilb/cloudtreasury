import UnauthorizedException from '../core/exceptions/UnauthorizedException.mjs';
import ForbiddenException from '../core/exceptions/ForbiddenException.mjs';
import Middleware from '../core/Middleware.mjs';
import LdapUnauthorizedException from '../exceptions/LdapUnauthorizedException.mjs';
import AuthHelper from '../helpers/AuthHelper.mjs';

export default class AccessMiddleware extends Middleware {
  constructor({ user, authService, remoteUserName }) {
    super();
    this.user = user;
    this.authService = authService;
    this.remoteUserName = remoteUserName;
  }

  async process(permission, context) {
    const user = await this.authService.signIn({}, 'ldap');
    if (permission) {
      if (permission === "auth") {
        return;
      }
    }

    const permissions = AuthHelper.getUserPermissions(user);

    if (!permissions.includes(permission)) {
      throw new ForbiddenException();
    }
  }

}
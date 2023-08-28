import AccessMiddleware from '../src/middlewares/AccessMiddleware.mjs';
import LdapMiddleware from '../src/middlewares/LdapMiddleware.mjs';
import XForwardMiddleware from "../src/middlewares/XForwardMiddleware.mjs";

export default {
  list: {
    access: {
      handler: AccessMiddleware,
    },
    ldap: {
      handler: LdapMiddleware,
    },
    xForward: {
      handler: XForwardMiddleware,
    }
  },
  default: ['ldap'],
};

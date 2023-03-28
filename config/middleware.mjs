import AccessMiddleware from '../src/middlewares/AccessMiddleware.mjs';
import LdapMiddleware from '../src/middlewares/LdapMiddleware.mjs';

export default {
  list: {
    access: {
      handler: AccessMiddleware,
    },
    ldap: {
      handler: LdapMiddleware,
    },
  },
  default: ['ldap'],
};

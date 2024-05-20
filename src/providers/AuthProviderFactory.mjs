import DatabaseAuthProvider from './DatabaseAuthProvider.mjs';
import CriticalException from '../core/exceptions/CriticalException.mjs';

export default class AuthProviderFactory {
  /**
   *
   * @param {Object} scope
   * @param {LdapAuthProvider} scope.ldapAuthProvider
   */
  constructor(scope) {
    this.scope = scope;
    this.ldapAuthProvider = scope.ldapAuthProvider;
  }

  /**
   * @param {"database" | "ldap"} type
   * @return {LdapAuthProvider|DatabaseAuthProvider}
   */
  getProvider(type) {
    console.log(type)
    switch (type) {
      case 'database':
        return new DatabaseAuthProvider(this.scope);
      case 'ldap':
        return this.ldapAuthProvider;
      default:
        throw new CriticalException('Provider for ' + type + ' is not defined');
    }
  }
}

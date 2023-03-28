export default class LdapUnauthorizedException {
  constructor(redirectUrl = '/') {
    this.type = 'LDAP UNAUTHORIZED';
    this.status = 403;
    this.message = 'Ldap unauthorized';
    this.redirectUrl = redirectUrl;
  }
}
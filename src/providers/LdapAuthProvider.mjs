import AuthProvider from "../core/auth/AuthProvider.mjs";
import { RuUser } from "@ilb/posixuserjs";
import ArrayHelper from "../helpers/ArrayHelper.mjs";

export default class LdapAuthProvider extends AuthProvider {
  /**
   * @param {UserService} userService
   * @param {UserRepository} userRepository
   * @param {RoleRepository} roleRepository
   * @param remoteUserName {string}
   * @param ldapPrefix {string | undefined}
   */
  constructor({ userService, userRepository, roleRepository, remoteUserName, ldapPrefix }) {
    super();
    this.roleRepository = roleRepository;
    this.userRepository = userRepository;
    this.userService = userService;
    this.remoteUserName = remoteUserName;
    this.ldapPrefix = ldapPrefix;
  }

  async signIn() {
    let user = await this.userRepository.findByLogin(this.remoteUserName);

    if (!user) {
      user = await this.signUp();
    } else {
      const givenRoles = user.relationMembers.map(({ role }) => this.ldapPrefix ? this.ldapPrefix.concat(role.code) : role.code);
      const updatedRoles = await this.getUserRoles(new RuUser(user.login));

      if (!ArrayHelper.isEqual(givenRoles, updatedRoles.map(role => role.code))) {
        await this.userService.setRoles(user.id, updatedRoles.map(role => role.id));
      }
    }

    const { password, ...withoutPassword } = user;
    return withoutPassword;
  }

  async signUp() {
    try {
      const ldapUser = new RuUser(this.remoteUserName);
      const roles = await this.getUserRoles(ldapUser);
      const [givenName, patronymic, surname] = ldapUser.getDisplayName().split(" ")
      const user = await this.userService.createUser({
        login: ldapUser.getName(),
        name: `${surname} ${givenName} ${patronymic}`
      });

      await this.userService.setRoles(user.id, roles.map(role => role.id));

      return await this.userRepository.findByLogin(this.remoteUserName);
    } catch (err) {
      console.trace(err);
      throw new Error(`Ошибка авторизации LDAP: ${err.message}`);
    }
  }

  async getUserRoles(user) {
    const roles = await this.roleRepository.getAll();
    return roles
      .map(role => this.ldapPrefix ? { ...role, code: this.ldapPrefix.concat(role.code) } : role)
      .filter(role => user.hasGroup(role.code));
  }
}

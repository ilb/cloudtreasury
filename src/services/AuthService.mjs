import Service from '../core/Service.mjs';
import PasswordHelper from '../helpers/PasswordHelper.mjs';

export default class AuthService extends Service {
  /**
   * @param {UserRepository} userRepository
   * @param {AuthProviderFactory} authProviderFactory
   */
  constructor({ userRepository, authProviderFactory }) {
    super();
    this.userRepository = userRepository;
    this.authProviderFactory = authProviderFactory;
  }

  /**
   * @param data - данные пользователя
   * @param {"database" | "ldap"} type - тип аутентификации
   * @return {Promise<*>}
   */
  async signIn(data, type) {
    const provider = this.authProviderFactory.getProvider(type);
    return provider.signIn(data);
  }

  /**
   * @param data - данные пользователя
   * @param type - тип аутентификации
   * @return {Promise<*>}
   */
  async signUp(data, type) {
    const provider = this.authProviderFactory.getProvider(type);
    return provider.signUp(data);
  }
}
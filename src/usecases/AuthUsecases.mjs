import Usecases from '../core/usecases/Usecases.mjs';

export default class AuthUsecases extends Usecases {
  /**
   * Авторизация
   *
   * @param {AuthService} authService
   * @param {Request} request
   * @returns {Promise<*>}
   */
  async signIn({ authService, request }) {
    return authService.signIn(request, 'database');
  }

  /**
   * LDAP авторизация
   * @param {AuthService} authService
   * @param request
   * @return {Promise<*>}
   */
  async signInLdap({ authService, request }) {
    return authService.signIn(request, 'ldap');
  }

  /**
   * Регистрация
   *
   * @param {AuthService} authService
   * @param {SignUpValidator} signUpValidator
   * @param {object} request
   * @returns {Promise<void>}
   */
  async signUp({ authService, signUpValidator, request }) {
    await signUpValidator.validate(request);

    return authService.signUp(request, 'database');
  }

  async getActualAuthUserInfo({ userRepository, user }) {
    return userRepository.findByLogin(user.login);
  }
}

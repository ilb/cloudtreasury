import Service from '../core/Service.mjs';
import PasswordHelper from '../helpers/PasswordHelper.mjs';

export default class AuthService extends Service {
  /**
   * @param {UserRepository} userRepository
   */
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async signIn(data) {
    if (!data.login) {
      return null;
    }

    const user = await this.userRepository.findByLogin(data.login);

    if (!user) {
      throw Error('User not found.')
    }

    if (!PasswordHelper.compareWithHash(data.password, user.password)) {
      throw Error('Incorrect password.')
    }

    return user;
  }
}
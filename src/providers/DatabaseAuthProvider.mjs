import PasswordHelper from "../helpers/PasswordHelper.mjs";
import AuthProvider from "./AuthProvider.mjs";


export default class DatabaseAuthProvider extends AuthProvider {
  /**
   * @param {UserRepository} userRepository
   */
  constructor({ userRepository }) {
    console.log('databaseAuthProvider 1')
    super();
    console.log('databaseAuthProvider 2')
    this.userRepository = userRepository;
  }

  async signIn(data, provider) {
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


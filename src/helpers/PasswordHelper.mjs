import bcrypt from 'bcrypt';

export default class PasswordHelper {

  static HASH_SALT_ROUNDS = 6;

  static compareWithHash(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static hash(password) {
    return bcrypt.hashSync(password, this.HASH_SALT_ROUNDS);
  }
}

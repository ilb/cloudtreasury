import Service from '../core/Service.mjs';
// import { User } from '../database/models/index.mjs';

export default class UserService extends Service {
  /**
   * @param {UserRepository} userRepository
   */
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }

  async createUser(userData) {
    return this.userRepository.create(userData);
  }
  async setRoles(userId, roleIds) {
    return this.userRepository.updateRoles(userId, roleIds);
  }
}
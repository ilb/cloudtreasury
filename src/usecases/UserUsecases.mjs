import Usecases from '../core/usecases/Usecases.mjs';

export default class UserUsecases extends Usecases {

  /**
   * @param {RoleRepository} roleRepository
   * @returns {Promise<{roles: (*)}>}
   */
  async index({ roleRepository }) {
    const roles = await roleRepository.getAll();

    return { roles };
  }

  /**
   * @param {UserRepository} userRepository
   * @param {UserAdapter} userAdapter
   * @param {Request} request
   * @returns {Promise<{users: Promise<*|Pick<*, *>>}>}
   */
  async list({ userRepository, userAdapter, request }) {
    return userRepository.getAllPaginated(request);
  }

  /**
   * @param {UserRepository} userRepository
   * @param {Request} request
   * @returns {Promise<*>}
   */
  async create({ userRepository, request }) {
    return userRepository.create(request);
  }

  /**
   * @param {UserRepository} userRepository
   * @param {RoleRepository} roleRepository
   * @param {Request} request
   * @returns {Promise<{user}>}
   */
  async read({ userRepository, request }) {
    return userRepository.findById(request.id);
  }

  /**
   * @param {UserRepository} userRepository
   * @param {RoleRepository} roleRepository
   * @param {Request} request
   * @returns {Promise<{user}>}
   */
  async show({ userRepository, roleRepository, request }) {
    const user = await userRepository.findById(request.id);
    const roles = await roleRepository.getAll();

    return { user, roles };
  }

  /**
   * @param {UserRepository} userRepository
   * @param {Request} request
   * @returns {Promise<*>}
   */
  async update({ userRepository, request}) {
    await userRepository.update(request);

    return userRepository.findById(request.id);
  }
}

import DictionaryUsecases from '../core/usecases/DictionaryUsecases.mjs';

export default class RoleUsecases extends DictionaryUsecases {
  /**
   * @param {RoleRepository} roleRepository
   */
  constructor({ roleRepository }) {
    super();
    this.repository = roleRepository;
  }

  /**
   * @param {PermissionRepository} permissionRepository
   * @return {Promise<{permissions: *, roles: (*|Pick<*, *>)}>}
   */
  async index({ permissionRepository }) {
    const roles = await this.repository.getAll();
    const permissions = await permissionRepository.getAll();

    return { roles, permissions };
  }
}
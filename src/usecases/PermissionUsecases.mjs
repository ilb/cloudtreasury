import DictionaryUsecases from '../core/usecases/DictionaryUsecases.mjs';

export default class PermissionUsecases extends DictionaryUsecases {
  /**
   * @param {PermissionRepository} permissionRepository
   */
  constructor({ permissionRepository}) {
    super();
    this.repository = permissionRepository;
  }
}

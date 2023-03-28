import CrudResource from './CrudResource.mjs';
import Api from '../helpers/Api.js';

export default class PaginationCrudResource extends CrudResource {
  /**
   * @param params
   * @returns {Promise<*|null>}
   */
  static async getList(params) {
    let { pagination, ...query } = params;
    query = { ...query, ...pagination }
    const res = await Api.get(`/${this.path}`, query);
    return this.handleResponse(res);
  }
}
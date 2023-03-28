import Resource from './Resource.mjs';
import Api from '../helpers/Api.js';

export default class CrudResource extends Resource {
  /**
   * @param data
   * @returns {Promise<[]>}
   */
  async getList(data = {}) {
    return this.client.get(`/${this.path}`, data)
  }

  /**
   * @param data
   * @return {Promise<*|undefined>}
   */
  async store(data) {
    if (data.id) {
      return this.update(data.id, data);
    } else {
      return this.create(data);
    }
  };

  /**
   * @param {object} data
   * @returns {Promise<object>}
   */
  async create(data) {
    return this.client.post(`/${this.path}`, data)
  };

  /**
   * @param {int} id
   * @returns {Promise<object>}
   */
  async read(id) {
    return this.client.get(`/${this.path}/${id}`)
  };

  /**
   * @param {int} id
   * @param {object} data
   * @returns {Promise<null>}
   */
  async update(id, data) {
    return this.client.put(`/${this.path}/${id}`, data)
  };

  /**
   * @param {int} id
   * @returns {Promise<null>}
   */
  async delete(id) {
    return this.client.delete(`/${this.path}/${id}`)
  }
}
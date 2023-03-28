import CrudUsecases from './CrudUsecases.mjs';

export default class DictionaryUsecases extends CrudUsecases {
  /**
   * @returns {Promise<*>}
   */
  async index() {
    const data = await this.repository.getAll();

    return { data };
  }

  /**
   * @return {Promise<void>}
   */
  async show() {

  }

  /**
   *
   * @return {Promise<*>}
   */
  async list() {
    return this.repository.getAll();
  }

  /**
   * @param {Request} request
   * @returns {Promise<*>}
   */
  async create({ request }) {
    return this.repository.create(request);
  }

  /**
   * @param {Request} request
   * @returns {Promise<*>}
   */
  async read({ request }) {

  }

  /**
   * @param {Request} request
   * @returns {Promise<*>}
   */
  async update({ request }) {
    return this.repository.update(request);
  }

  /**
   * @param {Request} request
   * @returns {Promise<*>}
   */
  async delete({ request }) {
    return this.repository.delete(request.id);
  }
}
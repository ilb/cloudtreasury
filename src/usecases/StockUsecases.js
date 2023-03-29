import Usecases from '../core/usecases/Usecases.mjs';

export default class StockUsecases extends Usecases {

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{users: Promise<*|Pick<*, *>>}>}
   */
  async index({ stockRepository , request }) {
    return stockRepository.getAll(request);
  }

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{users: Promise<*|Pick<*, *>>}>}
   */
  async create({ stockRepository , request }) {
    return stockRepository.create(request);
  }
  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{users: Promise<*|Pick<*, *>>}>}
   */
  async delete({ stockRepository , request }) {
    return stockRepository.delete(request);
  }

  /**
   * @param {StockRepository} stockRepository
   * @param {object} request
   * @returns {Promise<{users: Promise<*|Pick<*, *>>}>}
   */
  async update({ stockRepository, request }) {
    return stockRepository.update(request);
  }
}

import Usecases from '../core/usecases/Usecases.mjs';

export default class StockUsecases extends Usecases {

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{stockList: (*)}>}
   */
  async index({ stockRepository , request }) {
    const stockList = await stockRepository.getAll(request);
    return { stockList }
  }

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{stock: (*)}>}
   */
  async create({ stockRepository , request }) {
    const stock = await stockRepository.create(request);
    return { stock}
  }
  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{stock: (*)}>}
   */
  async delete({ stockRepository , request }) {
    const stock = await stockRepository.delete(request.id);
    return { stock }
  }

  /**
   * @param {StockRepository} stockRepository
   * @param {object} request
   * @returns {Promise<{stock: (*)}>}
   */
  async update({ stockRepository, request }) {
    const stock = await stockRepository.update(request);
    return { stock }
  }
}

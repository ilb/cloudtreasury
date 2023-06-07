import Usecases from '../core/usecases/Usecases.mjs';

export default class StockUsecases extends Usecases {

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{stockList: (*)}>}
   */
  async index({ stockRepository, request }) {
    const stocks = await stockRepository.getAll(request);

    return { stocks };
  }

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{stock: (*)}>}
   */
  async create({ stockRepository, request }) {
    return stockRepository.create(request);
  }

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{stock: (*)}>}
   */
  async delete({ stockRepository, request }) {
    return stockRepository.delete(request.id);
  }

  /**
   * @param {StockRepository} stockRepository
   * @param {object} request
   * @returns {Promise<{stock: (*)}>}
   */
  async update({ stockRepository, request }) {
    return stockRepository.update(request);
  }
}

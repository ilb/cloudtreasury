import Usecases from '../core/usecases/Usecases.mjs';

export default class StockUsecases extends Usecases {

  /**
   * @param {StockRepository} stockRepository
   * @param {Request} request
   * @returns {Promise<{stockList: (*)}>}
   */
  async index({ stockRepository, request }) {
    const stocks = await stockRepository.getAll(request);

    const filteredStocks = stocks.map((stock) => {
      const { endDate, ...filteredStock } = stock;
      if (endDate instanceof Date) {
        filteredStock.endDate = endDate.toISOString();
      }
      return filteredStock;
    });

    return { stocks: filteredStocks };
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
    const currentDate = new Date();
    return stockRepository.updateEndDate(request.id, currentDate);
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

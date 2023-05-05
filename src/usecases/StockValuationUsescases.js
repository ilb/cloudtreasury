import Usecases from '../core/usecases/Usecases.mjs';
// import stockValuationService from '../services/StockValuationService.mjs';
import CalculateFairPrice from './CalculateFairPrice.mjs'
// import stockValuationRepository from './../repositories/StockValuationRepository.mjs';
import { createScope } from '../../src/core/index.mjs';

export default class StockUsecases extends Usecases {
// * @param {StockValuationRepository} stockValuationRepository
  /**
   * @param {Request} request
   * @returns {Promise<{stockList: (*)}>}
   */
  async index({ request }) {
    const context = { query: { ...request.query, ...request.body }, request };
    const scope = await createScope(context.request);
    const usecase = new CalculateFairPrice(scope.cradle);

    // const usecase = new CalculateFairPrice(stockValuationService, stockValuationRepository);
    const requestContext = context.query;
    const result = await usecase.process(request);
    return { result }
  }

}

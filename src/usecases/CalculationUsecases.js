import Usecases from '../core/usecases/Usecases.mjs';
import FairPriceCalculator from '../libs/FairPriceCalculator.mjs'

export default class CalculationUsecases extends Usecases {
  
  /**
   * @param {CalculationRepository} calculationRepository
   * @param {Request} request
   * @returns {Promise<{calculations: (*)}>}
   */
  async index({ calculationRepository, request }) {
    const calculations = await calculationRepository.getAll(request);
    return { calculations };
  }


  async getCalculateAndSave({ request, calculationRepository, stockValuationService }) {
    const valuation = await stockValuationService.valuate({ "ticker": request.ticker, "date": request.date });
    const calculations = await calculationRepository.create({ ticker: request.ticker, date: request.date, data: valuation });
    return { calculations };
  }

  async getFile({ request, calculationRepository, documentRendererService }) {
    const stockValuations = await calculationRepository.findAllByDate(request);
    const currentDate = request.currentDate
    const file = new FairPriceCalculator(documentRendererService, stockValuations, currentDate);
    return {file}
  }
}

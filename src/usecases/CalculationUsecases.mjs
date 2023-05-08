import Usecases from '../core/usecases/Usecases.mjs';
import FairPriceCalculator from '../libs/FairPriceCalculator.mjs'
import FairPriceCalc from '../libs/FairPriceCalc/FairPriceCalc.mjs'

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

  // async getCalculateAndSave({ request }) {
  async getCalculateAndSave({ request, calculationRepository, stockValuationService }) {
    // const valuation = await stockValuationService.valuate({ "ticker": request.ticker, "date": request.date });
    // const calculations = await calculationRepository.create({ ticker: request.ticker, date: request.date, data: valuation });
    const calc = new FairPriceCalc(request.ticker)
    const result = calc.calculate(request.date)
    console.log(result)
    return { result };
  }

  async getFile({ request, calculationRepository, documentRendererService }) {
    const stockValuations = await calculationRepository.findAllByDate(request);
    const currentDate = request.currentDate
    const file = new FairPriceCalculator(documentRendererService, stockValuations, currentDate);
    return {file}
  }
}

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
  async getCalculateAndSave({ request, calculationRepository }) {
    const calc = new FairPriceCalc(request.ticker, request.initialVolume, request.isin)
    const calculations = await calc.calculate(request.date)

    await calculationRepository.create({ ticker: request.ticker, date: request.date, data: calculations });
    return { calculations };
  }

  async getFile({ request, calculationRepository, documentRendererService }) {
    const stockValuations = await calculationRepository.findAllByDate(request);
    const currentDate = request.currentDate
    const file = new FairPriceCalculator(documentRendererService, stockValuations, currentDate);
    return {file}
  }
}

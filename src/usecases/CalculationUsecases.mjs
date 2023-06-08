import Usecases from '../core/usecases/Usecases.mjs';

export default class CalculationUsecases extends Usecases {

  /**
   * @return {*}
   */
  async index() {
    return {};
  }

  /**
   * @param {CalculationRepository} calculationRepository
   * @param {Request} request
   * @returns {Promise<{calculations: (*)}>}
   */
  async list({ calculationService, request }) {
    return calculationService.getList(request);
  }

  /**
   * @param request
   * @param {CalculationRepository} calculationRepository
   * @param {CalculationService} calculationService
   * @return {Promise<{calculations: (Promise<{date: string, countDeals: *, initialVolume: *, marketData: [], active: string, fairPrice: *, countDays: *, tradingVolume: string, isin: *}>|*)}>}
   */
  async create({ request, calculationRepository, calculationService }) {
    const calculations = await calculationService.calculate(request);

    return calculationRepository.create({ ...request, data: calculations });
  }

  /**
   * @param request
   * @param {CalculationService} calculationService
   * @return {Promise<void>}
   */
  async exportCalculations({ request, calculationService }) {
    return calculationService.exportCalculations(request);
  }
}

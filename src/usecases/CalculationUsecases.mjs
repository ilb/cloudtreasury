import Usecases from '../core/usecases/Usecases.mjs';
import File from './../../src/core/classes/File.mjs';

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

  async getCalculationAndSave({ request, calculationRepository, calculationService }) {
    const calculations = await calculationService.calculator(request);
    await calculationRepository.create({ ticker: request.ticker, date: request.date, data: calculations });
    return { calculations };
  }

  async getFile({ request, calculationRepository, documentRendererService }) {
    const stockValuations = await calculationRepository.findAllByDate(request);
    const currentDate = request.currentDate
    const file = await documentRendererService.init(stockValuations, currentDate);
    return new File(file.content, file.contentType, file.attachmentName);
  }
}

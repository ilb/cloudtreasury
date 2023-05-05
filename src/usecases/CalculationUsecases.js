import Usecases from '../core/usecases/Usecases.mjs';

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
    console.log('getFile')
        console.log('date', request)
    const stockValuations = await calculationRepository.findAllByDate(request);
    const currentDate = request.currentDate



    const renderOptions = {
      attachmentName: `${currentDate}`,
      format: 'xlsx',
      formatTemp: 'ods'
    };

    const data = {};
    data.currentDate = currentDate;
    data.stockValuations = stockValuations.map(({ ticker, date, data }) => ({ 
      ticker, 
      date, 
      ...data, 
      active: data.active === 'ACTIVE' ? "ДА" : "НЕТ",
      adjustment: data.active === 'LOW_ACTIVE' ? "ДА" : "",
      fairPrice: data.fairPrice.toString().replace(".", ",") 
    }));

    return await documentRendererService.render(
      'tickers',
      data,
      renderOptions
    );
  }


}

import Usecases from '../core/usecases/Usecases.mjs';
import documentRenderer from '../services/DocumentRenderer.mjs'

export default class StockValuationsReportUsescases extends Usecases {

  async index({ stockValuationRepository, currentDate }) {
    const stockValuations = await stockValuationRepository.findByDate(currentDate);

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

    return await documentRenderer.render(
      'tickers',
      data,
      renderOptions
    );
  }

}

import Usecases from '../core/usecases/Usecases.mjs';

export default class CalculateFairPrice extends Usecases {

  async process({ request, calculationRepository, stockValuationService }) {
    const valuation = await stockValuationService.valuate({ "ticker": request.ticker, "date": request.date });

    const calculations = await calculationRepository.create({ ticker: request.ticker, date: request.date, data: valuation });
    return { calculations };

  }
}

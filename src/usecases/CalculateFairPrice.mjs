export default class CalculateFairPrice {
  constructor({ stockValuationService }) {
    this.stockValuationService = stockValuationService;
  }

  async process({ tickerInfo, request, stockValuationRepository }) {
    console.log('ticki', request)
    const valuation = await this.stockValuationService.valuate({ "ticker": tickerInfo.ticker, "date": tickerInfo.date });
    console.log(valuation)

    const calculations = await stockValuationRepository.create({ request });
    return { calculations };

  }
}

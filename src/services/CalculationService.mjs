export default class CalculationService {
  /**
   * @param {CalculationRepository} calculationRepository
   * @param {CalculationAdapter} calculationAdapter
   * @param {DocumentRendererService} documentRendererService
   * @param {FairPriceCalculator} fairPriceCalculator
   */
  constructor({ calculationRepository, calculationAdapter, documentRendererService, fairPriceCalculator }) {
    this.calculationRepository = calculationRepository;
    this.calculationAdapter = calculationAdapter;
    this.documentRendererService = documentRendererService;
    this.fairPriceCalculator = fairPriceCalculator;
  }

  async calculate(data) {
    return this.fairPriceCalculator.calculate(data);
  }

  async getList(params) {
    return this.calculationRepository.findAllByDate(params);
  }

  async exportCalculations(params) {
    const calculations = await this.getList(params);
    const printData = this.calculationAdapter.mapForPrint(calculations, params);
    return this.documentRendererService.render(printData, {
      template: `tickers.${params.extension}`,
      filename: `tickers_${printData.date}.${params.extension}`,
    });
  }
}
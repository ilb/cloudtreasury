import Service from '../core/Service.mjs';
import FairPriceCalc from '../libs/FairPriceCalc/FairPriceCalc.mjs';

export default class CalculationService extends Service {
  calculator(data) {
    const calc = new FairPriceCalc(data.ticker, data.initialVolume, data.isin);
    return calc.calculate(data.date)
  }
}
import DateUtils from './DateUtils.mjs';
import ExchangeDataProvider from './ExchangeDataProvider.mjs';
import ExchangePeriod from './ExchangePeriod.mjs';

export default class FairPriceCalculator {
  async calculate({ date, ticker, initialVolume, isin }) {
    // Returns list with calculated data about ticker in
    // curtain date: is active, deals, volume rate, isactive, fair price.
    const provider = new ExchangeDataProvider(date, ticker);
    const date_utils = new DateUtils();

    const marketData = await provider.getMarketData();

    const [countDeals, tradingVolume, countDays, weightedAverage] = this._getMergedValues(marketData);

    const volumeRate = (tradingVolume / initialVolume * 100).toFixed(2);

    // If ticker is active, fair price equals:
    // weighted average(of last trading day) * 10
    // else if ticker is low_active, equals:
    // weighted average * 10 * 0.99
    // else equals 0
    const active = new ExchangePeriod(initialVolume, countDeals, tradingVolume, countDays).getActivity();
    let fairPrice;
    if (active === 'ACTIVE') {
      // const last_average_index = marketData.length - 1;
      fairPrice = weightedAverage * 10;
    } else if (active === 'LOW_ACTIVE') {
      fairPrice = weightedAverage * 9.9;
    } else {
      fairPrice = 0;
    }
    return {
      active,
      fairPrice: parseFloat(fairPrice.toFixed(2)),
      countDays,
      countDeals,
      tradingVolume: parseFloat(volumeRate),
      initialVolume,
      isin: isin,
      date: date_utils.getEndDate(date),
      marketData
    };
  }

  _getMergedValues(marketData) {
    let countDeals = 0;
    let tradingVolume = 0;
    let countDays = 0;
    let weightedAverage = 0;

    for (let data of marketData) {
      countDeals += data.countDeals;
      if (data.tradingVolume > 0 && !isNaN(data.weightedAverage)) {
        tradingVolume += data.tradingVolume / (data.weightedAverage * 10);
      }
      if (data.countDeals > 0) {
        countDays += 1;
      }
      if (!isNaN(data.weightedAverage)) {
        weightedAverage = data.weightedAverage;
      } else {
        data.weightedAverage = 0;
      }
    }

    return [countDeals, tradingVolume, countDays, weightedAverage];
  }
}
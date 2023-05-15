export default class ExchangePeriod {

  minDays = 5;
  minTrades = 10;
  minVolumeRate = 0.1;

  constructor(initialVolume, countDeals, tradingVolume, countDays) {
    this.initialVolume = initialVolume;
    this.countDeals = countDeals;
    this.tradingVolume = tradingVolume;
    this.countDays = countDays;
  }

  getActivity() {
    let conditionsMet = 0;
    if (this.countDays >= this.minDays) conditionsMet += 1;
    if (this.countDeals >= this.minTrades) conditionsMet += 1;
    if (this._getVolumeRate() >= this.minVolumeRate) conditionsMet += 1;

    if (conditionsMet === 3) {
      return 'ACTIVE';
    } else if (conditionsMet === 2) {
      return 'LOW_ACTIVE';
    } else {
      return 'INACTIVE';
    }
  }

  _getVolumeRate() {
    return parseFloat((this.tradingVolume / this.initialVolume * 100).toFixed(2));
  }
}
import DateUtils from "./DateUtils.mjs";
import ExchangeDataProvider from './ExchangeDataProvider.mjs'

export default class FairPriceCalc {
    MIN_DAYS = 5
    MIN_TRADES = 10
    MIN_VOLUME_RATE = 0.1
    constructor(ticker, initialVolume, isin) {
        this.ticker = ticker
        this.initialVolume = initialVolume
        this.isin = isin
    }
    calculate (date) {
        // Returns list with calculated data about ticker in
        // curtain date: is active, deals, volume rate, isactive, fair price.

        const provider = new ExchangeDataProvider(date, this.ticker)
        const date_utils = new DateUtils()
        return provider.getExchangeData()
        //     [count_deals, trading_volume, count_days, weighted_average] = self._get_merged_values(market_data)
        //
        //     volume_rate = round(trading_volume / initial_volume * 100, 2)
        //
        // #
        //     If ticker is active, fair price equals:
        //         #
        //     weighted
        //     average(of
        //     last
        //     trading
        //     day
        // ) *
        //     10
        // # else
        //     if ticker is
        //     low_active, equals
        // :
        // #
        //     weighted
        //     average * 10 * 0.99
        // # else
        //     equals
        //     0
        //     active = ExchangePeriod(initial_volume, count_deals, trading_volume, count_days).get_activity()
        //     if active == 'ACTIVE':
        //     last_average_index = len(market_data) - 1
        //     fair_price = weighted_average * 10
        //     elif
        //     active == 'LOW_ACTIVE'
        // :
        //     fair_price = weighted_average * 9.9
        // else:
        //     fair_price = 0
        //
        //     return {
        //         'active': active, 'fairPrice': round(fair_price, 2),
        //         'countDays': count_days, 'countDeals': count_deals,
        //         'tradingVolume': volume_rate, 'initialVolume': initial_volume,
        //         'isin': isin,
        //         'date': date_utils.get_end_date(date),
        //         'marketData': market_data
        //     }
        // }
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
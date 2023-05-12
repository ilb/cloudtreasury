import { DataFrame } from 'dataframe-js';

export default class DataFrameParser {
  constructor(ticker) {
    this.ticker = ticker
  }

  async _parseCsv(file) {
    return await DataFrame.fromDSV(file, ';');
  }
  async parseExchangeFiles(marketFiles) {
    // Returns a dataframe with the exchange
    // data of curtain paper
    const framesList = [];
    for (const file of marketFiles) {
      if (file) {
        const df = await this._parseCsv(file);
        const tickerDf = df.filter(row => row.get('Code') === this.ticker);

        if (tickerDf.count() == 0) {
          continue;
        }

        framesList.push(tickerDf);
      }
    }

    if (framesList.length === 0) {
      throw new Error(`Data for this ticker does not exist: ${this.ticker}`);
    }
    return framesList.reduce((acc, df) => acc.union(df), new DataFrame([], ['Date', 'Code', 'Close', 'Open', 'Low', 'High', 'Bid', 'Ask', 'WeightedAverage', 'Amount', 'Volume', 'NumberOfTrades']));
  }
}
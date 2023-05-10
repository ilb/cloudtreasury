import FileBrowser from "./FileBrowser.mjs";
import DataFrameParser from "./DataFrameParser.mjs";

export default class ExchangeDataProvider {

  constructor(date, ticker) {
    this.ticker = ticker
    this.date = date
  }

  async getMarketData() {
    const browser = new FileBrowser(this.date);
    const parser = new DataFrameParser(this.ticker);
    const [volumeFile, exchangeFiles] = await browser.getFiles(); // here promises

    const exchangeDf = await parser.parseExchangeFiles(exchangeFiles);

    const marketData = [];
    const length = exchangeDf.count()
    for (let index=0; index<length; index++) {
      const row = exchangeDf.getRow(index)
      marketData.push({
        "countDeals": this._checkDTypeInt(row.get('NumberOfTrades')),
        "tradingVolume": this._checkDTypeFloat(row.get('Volume')),
        "weightedAverage": this._checkDTypeFloat(row.get('WeightedAverage'))
      });
    }

    return marketData;
  }

  _checkDTypeFloat(value) {
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'));
    } else {
      return parseFloat(value);
    }
  }
  _checkDTypeInt(value) {
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      return parseInt(value);
    } else {
      return parseInt(value);
    }
  }
}
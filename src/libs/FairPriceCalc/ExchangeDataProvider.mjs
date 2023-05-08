import FileBrowser from "./FileBrowser.mjs";
import DataFrameParser from "./DataFrameParser.mjs";

export default class ExchangeDataProvider {

    constructor(date, ticker) {
        this.ticker = ticker
        this.date = date
    }

    getInitialVolumeAndMarketData() {
        const browser = new FileBrowser(this.date);
        const parser = new DataFrameParser(this.ticker);
        const [volumeFile, exchangeFiles] = browser.getFiles();
        return [volumeFile, exchangeFiles]
        // console.log(volumeFile)
        // console.log(exchangeFiles)
        //
        // const volumeDf = parser.parseVolumeFile(volumeFile);
        // const exchangeDf = parser.parseExchangeFiles(exchangeFiles);
        //
        // const marketData = [];
        // for (let index in exchangeDf) {
        //     const row = exchangeDf[index];
        //     marketData.push({
        //         "countDeals": this._checkDtypeInt(row['NumberOfTrades']),
        //         "tradingVolume": this._checkDtypeFloat(row['Volume']),
        //         "weightedAverage": this._checkDtypeFloat(row['WeightedAverage'])
        //     });
        // }
        //
        // const initialVolume = this._getInitialVolume(volumeDf);
        // const isin = this._getIsin(volumeDf);
        //
        // return [initialVolume, isin, marketData];
    }

}
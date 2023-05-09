import FileBrowser from "./FileBrowser.mjs";
import DataFrameParser from "./DataFrameParser.mjs";

export default class ExchangeDataProvider {

    constructor(date, ticker) {
        this.ticker = ticker
        this.date = date
    }

    async getExchangeData() {
        const browser = new FileBrowser(this.date);
        const parser = new DataFrameParser(this.ticker);
        const [volumeFile, exchangeFiles] = await browser.getFiles(); // here promises
        // const volumeDf = await parser.parseVolumeFile(volumeFile);
        const exchangeDf = await parser.parseExchangeFiles(exchangeFiles);
        console.log(exchangeDf)
        return [exchangeDf]
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
import { DataFrame } from 'dataframe-js';
const fs = require('fs').promises;
import path from "path";
const { DOMParser } = require('xmldom');

export default class DataFrameParser {
    constructor(ticker) {
        this.ticker = ticker
    }

    async _parseCsv(file) {
        // return await DataFrame.fromCSV(file);
        return await DataFrame.fromDSV(file, ';');
    }
    async _parse_html (file) {

        const xhtmlContent = await fs.readFile(file, "utf-8");
        const parser = new DOMParser();
        const doc = parser.parseFromString(xhtmlContent, 'application/xhtml+xml');
        const content = doc.getElementsByTagName('body')[0].textContent; // Получение контента из документа
        const rows = content.trim().split(/\n/).map(row => [row]);
        return new DataFrame(rows, ['content']);
    }

    async parseVolumeFile (file) {
        return await this._parse_html(file);
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
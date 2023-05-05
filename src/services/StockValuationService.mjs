import { spawnSync } from 'child_process';
import Service from '../core/Service.mjs';

export default class StockValuationService extends Service {
  constructor({ stockValuationPath, pythonPath }) {
    super();
    this.stockValuationPath = stockValuationPath;
    this.pythonPath = pythonPath;
  }

  valuate(tickerInfo) {
    const data = spawnSync(this.pythonPath, [`fairpricecalc`], {
      argv0: 'PYTHONUTF8=1',
      env: {
        'ru.bystrobank.apps.stockvaluation.securitiesrefurl':
          'https://ilb.github.io/stockvaluation/securities.xhtml'
      },
      cwd: this.stockValuationPath,
      input: JSON.stringify({"ticker": tickerInfo.ticker, "date": tickerInfo.date}),
      encoding: 'utf8'
    });

    if (!data.status) {
      return JSON.parse(data.stdout);
    } else {
      throw new Error(data.stderr);
    }
  }
}

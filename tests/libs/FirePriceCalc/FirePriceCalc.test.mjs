import fs from 'fs/promises';
import FairPriceCalculator from '../../../src/libs/FairPriceCalc/FairPriceCalculator.mjs'
import DateUtils from '../../../src/libs/FairPriceCalc/DateUtils.mjs';
import path from 'path'


const fairPriceCalculator = new FairPriceCalculator();
const dateUtils = new DateUtils();

const casesDir = path.resolve() + '/tests/libs/FirePriceCalc/cases/';

describe('date range test', () => {
  it('range 1', () => {
    const range = dateUtils.dateRange('21.05.2019', -45);
    expect(range).toEqual(['2019-04-06', '2019-04-07', '2019-04-08', '2019-04-09', '2019-04-10', '2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16', '2019-04-17', '2019-04-18', '2019-04-19', '2019-04-20', '2019-04-21', '2019-04-22', '2019-04-23', '2019-04-24', '2019-04-25', '2019-04-26', '2019-04-27', '2019-04-28', '2019-04-29','2019-04-30', '2019-05-01', '2019-05-02', '2019-05-03','2019-05-04', '2019-05-05', '2019-05-06', '2019-05-07', '2019-05-08', '2019-05-09', '2019-05-10', '2019-05-11', '2019-05-12', '2019-05-13', '2019-05-14', '2019-05-15', '2019-05-16', '2019-05-17', '2019-05-18', '2019-05-19', '2019-05-20', '2019-05-21']);
  })
})

describe('calculate fair price for a ticker', () => {
  it('1 ticker', async () => {
    const result = await fairPriceCalculator.calculate(
      {
        ticker: 'ОФЗ 26223',
        initialVolume: 350000000,
        isin: 'RU000A0ZYU88',
        date: '21.05.2019'
      }
    );
    const expected = JSON.parse(
      await fs.readFile(
        casesDir + 'result1.json',
        'utf8'
      )
    );
    expect(result).toEqual(expected);
  });  

  it('2 ticker', async () => {
    const result = await fairPriceCalculator.calculate(
      {
        ticker: 'ОФЗ 26223',
        initialVolume: 350000000,
        isin: 'RU000A0ZYU88',
        date: '01.02.2020'
      }
    );
    const expected = JSON.parse(
      await fs.readFile(
        casesDir + 'result2.json',
        'utf8'
      )
    );
    expect(result).toEqual(expected);
  });


  it('3 ticker', async () => {
    const result = await fairPriceCalculator.calculate(
      {
        ticker: 'Росбанк2P5',
        initialVolume: 10000000,
        isin: null,
        date: '01.03.2020'
      }
    );
    const expected = JSON.parse(
      await fs.readFile(
        casesDir + 'result3.json',
        'utf8'
      )
    );
    expect(result).toEqual(expected);
  });

});
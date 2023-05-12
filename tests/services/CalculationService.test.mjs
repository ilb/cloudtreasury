import fs from 'fs/promises';
import CalculationService from './../../src/services/CalculationService.mjs'
import path from 'path'

const calculationService = new CalculationService();
const casesDir = path.resolve() + '/tests/services/cases'

describe('calculate fair price for a ticker', () => {


  it('1 ticker', async () => {
    const result = await calculationService.calculator(
      {
        ticker: 'ОФЗ 26223',
        initialVolume: 350000000,
        isin: 'RU000A0ZYU88',
        date: '2019-05-21'
      }
    );
    const expected = JSON.parse(
      await fs.readFile(
        casesDir + '/result1.json',
        'utf8'
      )
    );
    expect(result).toEqual(expected);
  });  

  it('2 ticker', async () => {
    const result = await calculationService.calculator(
      {
        ticker: 'ОФЗ 26223',
        initialVolume: 350000000,
        isin: 'RU000A0ZYU88',
        date: '2020-02-01'
      }
    );
    const expected = JSON.parse(
      await fs.readFile(
        casesDir + '/result2.json',
        'utf8'
      )
    );
    expect(result).toEqual(expected);
  });


  it('3 ticker', async () => {
    const result = await calculationService.calculator(
      {
        ticker: 'Росбанк2P5',
        initialVolume: 10000000,
        isin: null,
        date: '2020-03-01'
      }
    );
    const expected = JSON.parse(
      await fs.readFile(
        casesDir + '/result3.json',
        'utf8'
      )
    );
    expect(result).toEqual(expected);
  });
  
  

  });
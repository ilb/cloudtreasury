import Schema from './Schema.mjs';
import moment from 'moment';

export default class stockCalculationResultsSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        date: {
          title: 'Дата оценки',
          type: 'string',
          // format: 'date',
        },
        status: {
          title: 'Активный рынок',
          type: 'string'
        },
        fairPrice: {
          title: 'Справедливая стоимость ценной бумаги',
          type: 'string'
        },
        countDays: {
          title: 'Количество дней, в которые заключались сделки',
          type: 'string'
        },
        countDeals: {
          title: 'Количество совершенных сделок',
          type: 'string'
        },
        initialVolume: {
          title: 'Объем выпуска',
          type: 'string'
        },
        tradingVolume: {
          title: 'Суммарный объем торгов по ценной бумаге',
          type: 'string'
        }
      }
    }
  }
}
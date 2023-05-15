import Schema from './Schema.mjs';
import moment from 'moment';

export default class TickerRatingSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        ticker: {
          title: 'Тикер ценной бумаги',
          type: 'string'
        },
        date: {
          title: 'Дата оценки',
          type: 'object',
          // format: 'date',
          default: new Date()
        }
      },
  
      required: ['date']
    }
  }
}
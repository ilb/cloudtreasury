import Schema from './Schema.mjs';
import moment from 'moment';

export default class GeneratingReportSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        date: {
          title: 'Дата',
          type: 'string',
          default: moment().format('YYYY-MM-DD'),
          // format: 'date',
        }
      },
      required: ['date'],
    }
  }
}
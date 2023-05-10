import Schema from './Schema.mjs';
import moment from 'moment';

export default class GeneratingReportSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        currentDate: {
          title: 'Дата генерации',
          type: 'object',
          default: moment().format('YYYY-MM-DD'),
          // format: 'date',
        }
      },
      required: ['currentDate'],
    }
  }
}
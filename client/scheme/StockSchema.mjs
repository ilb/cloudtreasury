import Schema from './Schema.mjs';

export default class StockSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        ticker: {
          title: 'Наименование',
          type: 'string'
        },
        value: {
          title: 'Объём выпуска',
          type: 'integer'
        },
        isin: {
          title: 'ISIN',
          type: 'string',
          nullable: true
        }
      }
    }
  }
}
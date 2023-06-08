import moment from 'moment'

export default class CalculationAdapter {
  mapForPrint(stockValuations, params) {
    return {
      date: moment(params.date, 'YYYY-MM-DD').format('DD.MM.YYYY'),
      stockValuations: stockValuations.map(({ ticker, date, data }) => ({
        ticker,
        date,
        ...data,
        active: data.active === 'ACTIVE' ? 'ДА' : 'НЕТ',
        adjustment: data.active === 'LOW_ACTIVE' ? 'ДА' : '',
        fairPrice: data.fairPrice.toString().replace('.', ',')
      }))
    }
  }
}
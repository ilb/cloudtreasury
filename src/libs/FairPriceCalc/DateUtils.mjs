import moment from 'moment';

export default class DateUtils {
  getEndDate(dateStr) {
    if (dateStr === moment().format('DD.MM.YYYY')) {
      dateStr = moment(dateStr, 'DD.MM.YYYY').subtract(1, 'day').format('DD.MM.YYYY');
    }
    return dateStr
  }

  dateRange(dateStr, delta = -30) {
    const dateEnd = moment(dateStr, 'DD.MM.YYYY');
    const dateStart = moment(dateStr, 'DD.MM.YYYY').add(delta, 'days');

    const dateRange = [];
    while (dateStart <= dateEnd) {
      dateRange.push(dateStart.format('YYYY-MM-DD'));
      dateStart.add(1, 'days');
    }
    return dateRange
  }
}
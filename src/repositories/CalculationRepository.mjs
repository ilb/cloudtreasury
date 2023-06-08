import Repository from '../core/Repository.mjs';
import moment from 'moment';

export default class CalculationRepository extends Repository {
  async create({ ticker, date, data }) {
    date = moment(date, 'DD.MM.YYYY').toDate();

    return this.model.upsert({
      where: {
        dateTicker: {
          ticker,
          date
        }
      },
      create: {
        ticker,
        date,
        data
      },
      update: {
        data
      }
    });
  }

  async findAllByDate({ date }) {
    date = moment(date, 'YYYY-MM-DD').toDate();

    return this.model.findMany({
      where: {
        date
      }
    });
  }
}
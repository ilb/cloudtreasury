import Repository from "../core/Repository.mjs";

export default class CalculationRepository extends Repository {
  async getAll() {
    return this.model.findMany(
      {
        select: {
          id: true,
          createdAt: false,
          updatedAt: false,
          date: true,
          ticker: true,
          data: true,
        }
      }
    );
  }
  async create({ ticker, date, data })  {
    return this.model.upsert({
      where: {
        date_ticker: {
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

  async findByDate(date) {
    return this.model.findMany({
      where: {
        date
      }
    });
  }
  async findAllByDate({currentDate}) {
    return this.model.findMany({
      where: {
        date: currentDate
      }
    });
  }
}
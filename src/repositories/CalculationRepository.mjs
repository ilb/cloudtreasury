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

  async findAllByDate({currentDate}) {
    return this.model.findMany({
      where: {
        date: currentDate
      }
    });
  }
}
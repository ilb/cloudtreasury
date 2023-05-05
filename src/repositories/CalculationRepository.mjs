import Repository from "../core/Repository.mjs";

export default class CalculationRepository extends Repository {
    async getAll() {
        return this.model.findMany({
            include: {
                stock: true
            }
        });
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
}
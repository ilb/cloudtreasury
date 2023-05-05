import Repository from "../core/Repository.mjs";

export default class StockValuationRepository extends Repository {

  async create(data)  {
    console.log('data', data)
    // return await this.model.upsert({
    //   where: {
    //     date_ticker: {
    //       ticker,
    //       date
    //     }
    //   },
    //   create: {
    //     ticker,
    //     date,
    //     data
    //   },
    //   update: {
    //     data
    //   }
    // });
  }

  async findByDate(date) {
    return await this.model.findMany({
      where: {
        date
      }
    });
  }
}

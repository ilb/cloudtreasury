import Repository from "../core/Repository.mjs";

export default class StockRepository extends Repository {
  async getAll() {
    return this.model.findMany({
      orderBy: {
        ticker: 'asc'
      }
    });
  }

  async create(data) {
    return this.model.create({
      data: {
        ticker: data.ticker,
        value: parseInt(data.value),
        isin: data.isin
      }
    });
  }

  async update(params) {
    return this.model.update({
      where: {
        id: params.id
      },
      data: {
        value: parseInt(params.value),
        isin: params.isin
      }
    });
  }
}
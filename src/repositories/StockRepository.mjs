import Repository from "../core/Repository.mjs";
import prisma from '../libs/prisma.mjs'

export default class StockRepository extends Repository {
  async getAll(params) {
    const result = await prisma.stocks.findMany({
      orderBy: {
        ticker: 'asc'
      }
    });

    return this.formatResult({stockList: result}, params); // to do
  }

  async create(data) {
    const result = await prisma.Stocks.create({
      data: {
        ticker: data.ticker,
        value: +data.value,
        isin: data.isin
      }
    });

    return this.formatResult({stock: result}); // to do
  }

  async delete(params) {
    console.log(params)
    const result = await prisma.stocks.delete({
      where: {
        stock_id: params.id
      }
    });
    return this.formatResult({stock: result}); // to do
  }

  async update(params) {
    const result = await prisma.stocks.update({
      where: {
        stock_id: params.id
      },
      data: {
        value: +params.value,
        isin: params.isin
      }
    });
    return this.formatResult({stock: result}); // to do
  }
}
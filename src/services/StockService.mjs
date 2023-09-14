import { DateTime } from 'luxon';

export class StockService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async deleteStock(id) {
    const stock = await this.prisma.stock.findUnique({ where: { id } });
    if (!stock) {
      throw new Error(`Stock with id ${id} not found`);
    }

    await this.prisma.stock.update({
      where: { id },
      data: { endDate: DateTime.now() },
    });
  }

  // Other methods...
}

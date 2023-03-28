export default class Seeder {
  constructor(prisma) {
    this.prisma = prisma;
    this.setupTable();
    this.setupModel();
  }

  setupTable() {
    this.table = this.constructor.name.slice(0, -6);
  }

  setupModel() {
    this.modelName = this.table.charAt(0).toLowerCase() + this.table.slice(1);
    this.model = this.prisma[this.modelName];
  }

  async create(data) {
    await this.model.create({ data });
    await this.updateIdSequenceIfNeed([data]);
  }

  async updateIdSequenceIfNeed(data) {
    const ids = data.filter(row => row.id).map(row => row.id);

    if (ids.length) {
      const lastId = await this.getLastId();
      const maxId = Math.max(...ids);
      if (maxId >= lastId) {
        await this.setSequenceId(maxId + 1);
      }
    }
  }

  async getLastId() {
    const query = `SELECT last_value
                   FROM "${this.table}_id_seq";`;
    const result = await this.prisma.$queryRawUnsafe(query);
    return result[0].last_value;
  }

  async setSequenceId(id) {
    const query = `ALTER SEQUENCE "${this.table}_id_seq" RESTART WITH ${id};`;
    return this.prisma.$queryRawUnsafe(query);
  }

  async createMany(data) {
    try {
      await this.model.createMany({ data });
      await this.updateIdSequenceIfNeed(data);
    } catch (err) {
      console.error('Error: ' + err.message + ' in ' + this.constructor.name);
      throw new Error(err.message);
    }
  }

  async run() {
  }
}
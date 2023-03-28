export default class Repository {
  constructor({ prisma }) {
    this.prisma = prisma;
    this.setupTable();
    this.setupModel();
  }

  setupTable() {
    this.table = this.constructor.name.slice(0, -10);
  }

  setupModel() {
    const modelName = this.table.charAt(0).toLowerCase() + this.table.slice(1);
    this.model = this.prisma[modelName];
  }

  async getAll(params) {
    const result = await this.model.findMany();

    return this.formatResult(result, params)
  }

  async getAllPaginated(params) {
    const total = await this.model.count();
    const rows = await this.model.findMany({
      ...(params.order && {
        orderBy: [
          {
            [params.field]: params.order === 'descend' ? 'desc' : 'asc'
          }
        ]
      }),
      skip: (params.pageSize * params.current) - params.pageSize,
      take: parseInt(params.pageSize),
      include: params.include || {}
    });

    return {
      total,
      rows: this.formatResult(rows, params)
    }
  }

  async findUnique(data, params) {
    const result = await this.model.findUnique({ where: data });

    return this.formatResult(result, params)
  }

  async findById(id, params) {
    const result = await this.model.findUnique({ where: { id } });

    return this.formatResult(result, params)
  }

  async findByUuid(uuid, params) {
    const result = await this.model.findUnique({ where: { uuid } });

    return this.formatResult(result, params)
  }

  async create(data) {
    return this.model.create({ data });
  }

  async update(data) {
    return this.model.update({ where: this.getUniqueFilter(data), data });
  }

  async upsert(filter, data) {
    return this.model.upsert({ where: filter, update: data, create: data })
  }

  async delete(id) {
    return this.model.delete({ where: {id} })
  }

  formatResult(data, params) {
    if (!params?.withDates) {
      return this.removeDates(data)
    }

    return data;
  }

  removeDates(data) {
    if (data === null) { // ничего не найдено
      return data;
    }

    if (Array.isArray(data)) { // массив
      return data.map(({ createdAt, updatedAt, ...row }) => row)
    }

    // одна запись
    const { createdAt, updatedAt, ...row } = data;

    return row;
  }


  getUniqueFilter({ id, uid, uuid }) {
    if (id) {
      return { id };
    } else if (uid) {
      return { uid };
    } else {
      return { uuid };
    }
  }
}
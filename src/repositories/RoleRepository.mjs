import Repository from '../core/Repository.mjs';
import { filterObject } from '../helpers/utils.mjs';

export default class RoleRepository extends Repository {
  async getAll(params) {
    const result = await this.model.findMany({
      include: {
        permissions: {
          select: {
            id: true,
            code: true,
            title: true,
          }
        }
      }
    });

    return this.formatResult(result, params)
  }

  async create(data) {
    return this.model.create({
      data: {
        code: data.code,
        title: data.title,
        permissions: { connect: Object.keys(data.permissions).map(code => ({ code })) },
      },
    })
  }

  async update(data) {
    return this.model.update({
      where: { id: data.id },
      data: {
        code: data.code,
        title: data.title,
        permissions: {
          set: Object.keys(filterObject(data.permissions, (permission) => permission)).map(code => ({ code }))
        },
      },
    })
  }
}

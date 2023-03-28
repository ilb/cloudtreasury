import Repository from '../core/Repository.mjs';
import Prisma from '@prisma/client';

export default class UserRepository extends Repository {
  async getAllPaginated(params) {
    return super.getAllPaginated({
      ...params, include: {
        relationMembers: {
          include: {
            role: true
          }
        }
      }
    });
  }

  async findByLogin(login) {
    const result = await this.model.findUnique({
      where: { login },
      include: {
        relationMembers: {
          include: {
            role: {
              include: {
                permissions: true
              }
            }
          }
        }
      }
    });

    return this.formatResult(result);
  }

  async create(user) {
    if (!user.data) {
      user.data = Prisma.dbNull
    }

    if (user.roleId) {
      user.role = {
        connect: {
          id: user.roleId
        }
      }
      delete user.roleId;
    }

    return super.create(user);
  }

  async update(user) {
    if (!user.data) {
      user.data = Prisma.dbNull
    }

    if (user.roleId) {
      user.relationMembers = {
        deleteMany: {},
        create: {
          role: {
            connect: {
              id: user.roleId
            }
          },
          relation: {
            connect: {
              id: 1
            }
          }
        }
      };
      delete user.roleId;
    }
    return super.update(user);
  }

  async findById(id) {
    const result = await this.model.findUnique({
      where: { id },
      include: {
        relationMembers: {
          select: {
            role: {
              select: {
                id: true,
                code: true,
                title: true
              }
            }
          }
        }
      }
    });

    return this.formatResult(result);
  }
}

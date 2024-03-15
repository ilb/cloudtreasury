import Repository from '../core/Repository.mjs';

export default class HeartbeatRepository extends Repository {
  async test() {
    return this.prisma.$queryRaw`select * from _prisma_migrations limit 0;`;
  }
}

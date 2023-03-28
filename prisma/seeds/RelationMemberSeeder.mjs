import Seeder from '../../src/core/Seeder.mjs';

export default class RelationMemberSeeder extends Seeder {
  async run() {
    const relationMembers = [
      {
        id: 1,
        roleId: 1,
        relationId: 1,
        userId: 1,
      },
      {
        id: 2,
        roleId: 3,
        relationId: 1,
        userId: 2,
      },
    ];

    await this.createMany(relationMembers);
  }
}

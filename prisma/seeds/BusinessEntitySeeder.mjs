import Seeder from '../../src/core/Seeder.mjs';

export default class BusinessEntitySeeder extends Seeder {
  async run() {
    const organizations = [
      {
        id: 1,
        name: 'ООО "БРОКЕР"',
        uid: 'c36067c3-2f15-4a02-8b13-5e755daa1375',
      },
    ];

    await this.createMany(organizations);
  }
}

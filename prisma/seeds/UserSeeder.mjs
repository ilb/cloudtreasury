import Seeder from '../../src/core/Seeder.mjs';

export default class UserSeeder extends Seeder {
  async run() {
    const users = [
      {
        id: 1,
        login: 'admin',
        name: 'Admin',
        password: '$2b$06$W6buUDD9eVL2VloYVXtw3O/Ea3t8nJaVWCEBB65OUlTkkyuSbfT/y', // 123123
      },
      {
        id: 2,
        login: 'analyst',
        name: 'Analyst',
        password: '$2b$06$W6buUDD9eVL2VloYVXtw3O/Ea3t8nJaVWCEBB65OUlTkkyuSbfT/y', // 123123
      },
    ];

    for (const user of users) {
      await this.create(user);
    }
  }
}

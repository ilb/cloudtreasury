import Seeder from '../../src/core/Seeder.mjs';

export default class RoleSeeder extends Seeder {
  async run() {
    const permissions = await this.prisma.Permission.findMany();
    const analystPermissions = permissions.filter(permission => ['offers_create', 'offers_read', 'offers_update', 'offers_delete'].includes(permission.code));

    const roles = [
      {
        id: 1,
        title: 'Администратор',
        code: 'admin',
        permissions: { connect: permissions.map((permission) => ({ code: permission.code })) },
      },
      {
        id: 2,
        title: 'Тестовая роль LDAP',
        code: 'testgroup',
        permissions: { connect: permissions.map((permission) => ({ code: permission.code })) },
      },
      {
        id: 3,
        title: 'Аналитик',
        code: '.apps.loandeal.analyst',
        permissions: { connect: analystPermissions.map((permission) => ({ code: permission.code })) },
      },
    ];

    for (const role of roles) {
      await this.create(role);
    }
  }
}

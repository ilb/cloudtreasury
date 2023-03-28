import Seeder from '../../src/core/Seeder.mjs';

export default class PermissionSeeder extends Seeder {
  async run() {
    const permissions = [
      {
        id: 1,
        code: 'users_create',
        title: 'Добавление пользователей',
      },
      {
        id: 2,
        code: 'users_read',
        title: 'Просмотр пользователей',
      },
      {
        id: 3,
        code: 'users_update',
        title: 'Редактирование пользователей',
      },
      {
        id: 4,
        code: 'users_delete',
        title: 'Удаление пользователей',
      },
      {
        id: 5,
        code: 'roles_create',
        title: 'Добавление ролей',
      },
      {
        id: 6,
        code: 'roles_read',
        title: 'Просмотр ролей',
      },
      {
        id: 7,
        code: 'roles_update',
        title: 'Редактирование ролей',
      },
      {
        id: 8,
        code: 'roles_delete',
        title: 'Удаление ролей',
      },
      {
        id: 9,
        code: 'permissions_create',
        title: 'Добавление прав',
      },
      {
        id: 10,
        code: 'permissions_read',
        title: 'Просмотр прав',
      },
      {
        id: 11,
        code: 'permissions_update',
        title: 'Редактирование прав',
      },
      {
        id: 12,
        code: 'permissions_delete',
        title: 'Удаление прав',
      },
      {
        id: 13,
        code: 'offers_create',
        title: 'Добавление заявок',
      },
      {
        id: 14,
        code: 'offers_read',
        title: 'Просмотр заявок',
      },
      {
        id: 15,
        code: 'offers_update',
        title: 'Редактирование заявок',
      },
      {
        id: 16,
        code: 'offers_delete',
        title: 'Удаление заявок',
      },
      {
        id: 17,
        code: 'settings_create',
        title: 'Добавление настроек',
      },
      {
        id: 18,
        code: 'settings_read',
        title: 'Просмотр настроек',
      },
      {
        id: 19,
        code: 'settings_update',
        title: 'Редактирование настроек',
      },
      {
        id: 20,
        code: 'settings_delete',
        title: 'Удаление настроек',
      },
      {
        id: 22,
        code: 'menu_read',
        title: 'Просмотр бокового и верхнего меню',
      },
    ];
    await this.createMany(permissions);
  }
}

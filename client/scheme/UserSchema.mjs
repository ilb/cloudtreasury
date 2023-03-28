import Schema from './Schema.mjs';

export default class UserSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        login: { title: 'Логин', type: 'string', isNotEmpty: true },
        name: { title: 'Имя', type: 'string', isNotEmpty: true },
        roleId: { title: 'Роль', type: 'number' }
      },
      required: ['login', 'name', 'roleId'],
    }
  }
}
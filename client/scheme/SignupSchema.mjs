import Schema from './Schema.mjs';

export default class SignupSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        login: { title: 'Логин', type: 'string', isNotEmpty: true },
        name: { title: 'Имя', type: 'string', isNotEmpty: true },
        password: { title: 'Пароль', type: 'string', isNotEmpty: true },
      },
      required: ['login', 'name', 'password'],
    };
  }
}
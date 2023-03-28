import Schema from './Schema.mjs';

export default class SigninSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        login: { title: 'Логин', type: 'string', isNotEmpty: true },
        password: { title: 'Пароль', type: 'string', isNotEmpty: true },
      },
      required: ['login', 'password'],
    };
  }
}
import Schema from './Schema.mjs';

export default class RoleSchema extends Schema {
  get(permissions) {
    return {
      type: 'object',
      properties: {
        title: { title: 'Название', type: 'string' },
        code: { title: 'Код', type: 'string' },
        permissions: {
          type: 'object',
          properties: permissions.reduce((acc, cur) => {
            acc[cur.code] = { title: cur.title, type: 'boolean' };

            return acc;
          }, {})
        }
      },
      required: ['title', 'code'],
    }
  }
}
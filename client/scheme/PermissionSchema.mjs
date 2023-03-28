import Schema from './Schema.mjs';

export default class PermissionSchema extends Schema {
  get() {
    return {
      type: 'object',
      properties: {
        title: { title: 'Название', type: 'string' },
        code: { title: 'Код', type: 'string' },
      },
      required: ['title', 'code'],
    }
  }
}
import { filterObjByKey } from '../helpers/utils.mjs';

export default class ModelBuilder {
  // todo сделать поддержку вложенных полей
  static make(data, schema) {
    const fields = Object.keys(schema.properties);

    if (!data) return data;

    return filterObjByKey(data, fields);
  }
}
import ajv from '../libs/ajv.mjs';

export default class Validator {
  async validate(request) {
    this.validateBySchema(request);
  }

  validateBySchema(request) {
    const schema = this.schema();

    if (!schema) return;

    const validate = ajv.compile(schema);

    if (!validate(request)) {
      throw new Error(JSON.stringify(validate.errors));
    }
  }

  /**
   *
   * @returns {null|object}
   */
  schema() {
    return null;
  }
}
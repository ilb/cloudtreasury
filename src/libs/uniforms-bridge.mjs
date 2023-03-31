import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import ajv from './ajv.mjs';
import localize from 'ajv-i18n';
import ErrorFormatter from '../../client/helpers/ErrorFormatter.mjs';

const createValidator = (schema, additionalValidator) => {
  const validator = ajv.compile(schema);

  return (model) => {
    let errors = [];

    validator(model);

    if (validator.errors && validator.errors.length) {
      errors = validator.errors;
    }

    if (additionalValidator) {
      errors = errors.concat(additionalValidator(model));
    }
    console.log(errors);
    if (errors.length) {
      localize.ru(errors);
      return { details: ErrorFormatter.make(errors, schema) };
    }
  };
};

const createSchemaBridge = (schema, additionalValidator) => {
  const schemaValidator = createValidator(schema, additionalValidator);

  return new JSONSchemaBridge(schema, schemaValidator);
}

export default createSchemaBridge;
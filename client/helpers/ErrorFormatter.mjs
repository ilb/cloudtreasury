import { ucfirst } from './utils.mjs';

export default class ErrorFormatter {
  static make(errors, schema) {
    const errorMessages = [];

    for (const error of errors) {
        const errorFieldName = Object.values(error.params)[0];

        if (schema.properties[errorFieldName]) {
          const fieldTitle = schema.properties[errorFieldName].title;

          error.message = ucfirst(error.message.replace(errorFieldName, `"${fieldTitle}"`));

          errorMessages.push(error);
        } else {
          errorMessages.push(error)
        }
    }

    return errorMessages;
  }
}
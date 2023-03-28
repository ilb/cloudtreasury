export default class Constants {
  static list() {
    const properties = Object.getOwnPropertyNames(this);
    const constants = properties.filter(this.isConstant);

    return constants.map(constant => ({ value: constant, label: this[constant] }));
  }

  static isConstant(property) {
    return property === property.toUpperCase();
  }
}
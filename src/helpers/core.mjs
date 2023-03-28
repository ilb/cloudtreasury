/**
 * Возвращает значение из .env по ключу key.
 * Если значение не определено - возвращает defaultValue если оно передано или null в ином случае.
 *
 * @param key
 * @param defaultValue
 * @returns {string|boolean|null}
 */
export const env = (key, defaultValue = null) => {
  const value = process.env[key];

  switch(value) {
    case 'false':
      return false;
    case 'true':
      return true;
    case undefined:
      return defaultValue;
    default:
      return value;
  }
};

/**
 * @param key
 * @param defaultValue
 */
export const config = async (key, defaultValue = null) => {
  // todo сделать кеширование файлов
  const [configName, ...keyArr] = key.split('.');

  const config = (await import((`../../config/${configName}.mjs`))).default;
  const value = keyArr.reduce((o, i) => o[i], config);

  return value !== undefined ? value : defaultValue;
};

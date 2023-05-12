import Resource from './Resource.mjs';

export default class CalculationResource extends Resource {
  path = '/calculations'

  /**
   * @param {object} data
   * @returns {Promise<object>}
   */
  async create(data) {
    return this.client.post(this.path, data)
  };

  /**
   * Получение данных для таблицы
   *
   * @param params
   * @return {Promise<{rows: *}>}
   */
  async getCalculationsData(params) {
    const calculations = await this.client.get(this.path, params);
    const mappedCalculations = calculations.map(({ id, date, ticker, data }) => ({ id, date, ticker, ...data}));

    return { rows: mappedCalculations };
  }

  /**
   * Экспорт в xlsx
   *
   * @param params
   * @return {Promise<{ok: boolean} | {ok: boolean, error: *}>}
   */
  async exportCalculationsData(params) {
    return this.client.downloadFile(`${this.path}/export`, params);
  }
}
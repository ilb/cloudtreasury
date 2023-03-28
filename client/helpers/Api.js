export default class Api {
  static apiPath = process.env.API_PATH || '';

  /**
   * get-запрос
   *
   * @param url
   * @param data
   * @returns {Promise<*>}
   */
  static async get(url, data = {}) {
    return this.execute(url, 'GET', data);
  }

  /**
   * post-запрос
   *
   * @param url
   * @param data
   * @returns {Promise<*>}
   */
  static async post(url, data = {}) {
    return this.execute(url, 'POST', data);
  }

  /**
   * put-запрос
   *
   * @param url
   * @param data
   * @returns {Promise<*>}
   */
  static async put(url, data = {}) {
    return this.execute(url, 'PUT', data);
  }

  /**
   * delete-запрос
   *
   * @param url
   * @param data
   * @returns {Promise<*>}
   */
  static async delete(url, data = {}) {
    return this.execute(url, 'DELETE', data);
  }

  static async execute(url, method, data) {
    const link = this.prepareUrl(url, method, data);
    const params = this.prepareParams(link, method, data);
    const response = await fetch(link, params);

    return this.handleResponse(response);
  }

  static prepareUrl(url, method, data) {
    if (method === 'GET') {
      url = `${url}?${new URLSearchParams(data).toString()}`;
    }

    return this.apiPath + url;
  }

  static prepareParams(url, method, data) {
    const params = { method };

    if (method !== 'GET') {
      params.body = JSON.stringify(data);
    }

    return params;
  }

  static async handleResponse(res) {
    let body;

    if (res.headers.get('Content-Type')?.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }

    return { ok: res.ok, body };
  }
}
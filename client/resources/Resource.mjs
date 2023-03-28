import Querable from '../../src/core/Querable.mjs';

export default class Resource extends Querable {
  path = '';

  constructor() {
    super();
    this.client.setConfig({
      baseUrl: process.env.API_PATH
    })
  }
}
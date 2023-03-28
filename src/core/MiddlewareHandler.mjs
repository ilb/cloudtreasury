import { config } from '../helpers/core.mjs';

export default class MiddlewareHandler {
  middlewareResults = [];

  constructor(scope) {
    this.scope = scope;
  }

  prepareData(middlewaresData) {
    if (typeof middlewaresData === 'string') {
      middlewaresData = [middlewaresData];
    }

    const data = {};

    for (const middlewareData of middlewaresData) {
      const [middlewareName, value] = middlewareData.split(':');
      data[middlewareName] = value;
    }

    return data;
  }

  async process(middlewaresData, context) {
    middlewaresData = this.prepareData(middlewaresData);

    const actualMiddlewares = await this.getActualMiddlewares(Object.keys(middlewaresData));

    for (const key in actualMiddlewares) {
      const middleware = actualMiddlewares[key];

      if (await middleware.filter(middlewaresData[key], context)) {
        const result = await middleware.process(middlewaresData[key], context);

        if (result) {
          return result;
        }
      }
    }
  }

  async getActualMiddlewares(middlewareNames) {
    const actualMiddlewares = {};
    const middlewares = await config('middleware');

    for (const defaultMiddlewareName of middlewares.default) {
      actualMiddlewares[defaultMiddlewareName] = new middlewares.list[defaultMiddlewareName].handler(this.scope);
    }

    for (const middlewareName of middlewareNames) {
      actualMiddlewares[middlewareName] = new middlewares.list[middlewareName].handler(this.scope);
    }

    return actualMiddlewares;
  }
}

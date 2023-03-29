import JsonResponse from './responses/JsonResponse.mjs';
import PageResponse from './responses/PageResponse.mjs';
import MiddlewareHandler from './MiddlewareHandler.mjs';
import PageContext from './contexts/PageContext.mjs';
import JsonContext from './contexts/JsonContext.mjs';

/**
 * Обработка запроса API
 *
 * @param usecases
 * @param method
 * @param middlewares
 * @return {(function(*, *, *): Promise<void>)|*}
 */
export function handleRequest(usecases, method, middlewares = []) {
  return async (req, res, next) => {
    const context = await JsonContext.build({ req, res, next });

    return handle(usecases, method, middlewares, JsonResponse, context);
  };
}

/**
 * Обработка запроса для отображения страницы
 *
 * @param usecases
 * @param method
 * @param middlewares
 * @return {(function(*, *, *): Promise<*|undefined>)|*}
 */
export function handlePage(usecases, method, middlewares = []) {
  return async (data) => {
    const context = await PageContext.build(data);

    return handle(usecases, method, middlewares, PageResponse, context);
  };
}

/**
 * Обработка запроса
 *
 * @param usecases
 * @param {string} method
 * @param {string|null} middlewares
 * @param responseHandler
 * @param context
 * @return {(function(*, *, *): Promise<*|undefined>)|*}
 */
export async function handle(usecases, method, middlewares, responseHandler, context) {
  try {
    const scope = await createScope(context);

    await startMiddlewares(scope.cradle, context, middlewares);
    const instance = new usecases(scope.cradle);
    const result = await instance[method](scope.cradle);

    return responseHandler.build(result, context.res);
  } catch (exception) {
    console.log('exception', exception);
    return responseHandler.exception(exception, context.res);
  }
}

async function startMiddlewares(scope, context, middlewares) {
  const middlewareHandler = new MiddlewareHandler(scope, context);

  return middlewareHandler.process(middlewares, context);
}

/**
 * @param context
 * @return {Promise<AwilixContainer<any>>}
 */
export async function createScope(context) {
  const Kernel = (await import('../Kernel.mjs')).default;
  const kernel = new Kernel();

  return kernel.createApplication(context);
}

export async function createBinScope() {
  const Kernel = (await import('../../bin/Kernel.mjs')).default;
  const kernel = new Kernel();

  return kernel.createApplication();
}


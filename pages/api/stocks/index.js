import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import StockUsecases from "../../../src/usecases/StockUsecases";

export default createRouter()
  .get(handleRequest(StockUsecases, 'index', 'access:stocks_read'))
  .post(handleRequest(StockUsecases, 'create', 'access:stocks_create'))
  .handler();

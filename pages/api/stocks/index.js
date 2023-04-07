import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import StockUsecases from "../../../src/usecases/StockUsecases";

export default createRouter()
  .get(handleRequest(StockUsecases, 'index', 'access:roles_read'))
  .post(handleRequest(StockUsecases, 'create', 'access:roles_create'))
  .handler();

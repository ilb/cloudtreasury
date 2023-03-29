import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import StockUsecases from "../../../src/usecases/StockUsecases";

export default createRouter()
  .get(handleRequest(StockUsecases, 'index'))
  .post(handleRequest(StockUsecases, 'create'))
  .handler();

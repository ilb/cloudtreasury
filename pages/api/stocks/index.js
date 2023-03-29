import { createRouter } from 'next-connect';
import RoleUsecases from '../../../src/usecases/RoleUsecases.mjs';
import { handleRequest } from '../../../src/core/index.mjs';
import StockUsecases from "../../../src/usecases/StockUsecases";

export default createRouter()
  .get(handleRequest(StockUsecases, 'list'))
  // .post(handleRequest(StockUsecases, 'create'))
  .handler();

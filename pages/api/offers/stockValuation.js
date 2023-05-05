import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import StockValuationUsescases from "../../../src/usecases/StockValuationUsescases.js";

export default createRouter()
  .post(handleRequest(StockValuationUsescases, 'index', 'access:offers_create'))
  .handler();
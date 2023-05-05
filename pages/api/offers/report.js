import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import StockValuationsReportUsescases from "../../../src/usecases/StockValuationsReportUsescases.mjs";

export default createRouter()
  .get(handleRequest(StockValuationsReportUsescases, 'index', 'access:offers_read'))
  .handler();
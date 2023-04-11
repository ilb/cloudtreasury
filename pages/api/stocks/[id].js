import {handleRequest} from "../../../src/core/index.mjs";
import StockUsecases from "../../../src/usecases/StockUsecases";
import {createRouter} from "next-connect";

export default createRouter()
  // .get(handleRequest(StockUsecases, 'read'))
  .put(handleRequest(StockUsecases, 'update', 'access:stocks_update'))
  .delete(handleRequest(StockUsecases, 'delete', 'access:stocks_delete'))
  .handler()
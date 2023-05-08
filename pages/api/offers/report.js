import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import CalculationUsecases from "../../../src/usecases/CalculationUsecases.mjs";

export default createRouter()
  .get(handleRequest(CalculationUsecases, 'getFile', 'access:offers_read'))
  .handler();
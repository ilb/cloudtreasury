import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import CalculationUsecases from "../../../src/usecases/CalculationUsecases.mjs";

export default createRouter()
  .get(handleRequest(CalculationUsecases, 'list', 'access:calculations_read'))
  .post(handleRequest(CalculationUsecases, 'create', 'access:calculations_read'))
  .handler();
import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import CalculationUsecases from "../../../src/usecases/CalculationUsecases.mjs";

export default createRouter()
  .post(handleRequest(CalculationUsecases, 'getCalculationAndSave', 'access:offers_create'))
  .handler();
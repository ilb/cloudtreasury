import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import CalculationUsecases from "../../../src/usecases/CalculationUsecases";

export default createRouter()
  .post(handleRequest(CalculationUsecases, 'getCalculateAndSave', 'access:offers_create'))
  .handler();
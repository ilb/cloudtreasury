import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import CalculationUsecases from "../../../src/usecases/CalculationUsecases.mjs";
import FileResponse from './../../../src/core/responses/FileReponse.mjs'

export default createRouter()
  .get(handleRequest(CalculationUsecases, 'exportCalculations', 'access:calculations_read', FileResponse))
  .handler();
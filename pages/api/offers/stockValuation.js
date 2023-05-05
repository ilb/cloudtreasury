import { createRouter } from 'next-connect';
import { handleRequest } from '../../../src/core/index.mjs';
import CalculateFairPriceUsecases from '../../../src/usecases/CalculateFairPriceUsecases.mjs';

export default createRouter()
  .post(handleRequest(CalculateFairPriceUsecases, 'process', 'access:offers_create'))
  .handler();
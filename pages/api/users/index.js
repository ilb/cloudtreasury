import { createRouter } from 'next-connect';
import UserUsecases from '../../../src/usecases/UserUsecases.mjs';
import { handleRequest } from '../../../src/core/index.mjs';

export default createRouter()
  .get(handleRequest(UserUsecases, 'list'))
  .post(handleRequest(UserUsecases, 'create'))
  .handler();

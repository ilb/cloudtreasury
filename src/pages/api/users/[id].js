import { createRouter } from 'next-connect';
import UserUsecases from '../../../src/usecases/UserUsecases.mjs';
import { handleRequest } from '../../../src/core/index.mjs';

export default createRouter()
  .get(handleRequest(UserUsecases, 'read'))
  .put(handleRequest(UserUsecases, 'update'))
  .delete(handleRequest(UserUsecases, 'delete'))
  .handler();

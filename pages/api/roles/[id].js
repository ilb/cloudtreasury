import { createRouter } from 'next-connect';
import RoleUsecases from '../../../src/usecases/RoleUsecases.mjs';
import { handleRequest } from '../../../src/core/index.mjs';

export default createRouter()
  .get(handleRequest(RoleUsecases, 'read'))
  .put(handleRequest(RoleUsecases, 'update'))
  .delete(handleRequest(RoleUsecases, 'delete'))
  .handler();

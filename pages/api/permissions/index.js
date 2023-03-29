import { createRouter } from 'next-connect';
import PermissionUsecases from '../../../src/usecases/PermissionUsecases.mjs';
import { handleRequest } from '../../../src/core/index.mjs';

export default createRouter()
  .get(handleRequest(PermissionUsecases, 'list'))
  .post(handleRequest(PermissionUsecases, 'create'))
  .handler();

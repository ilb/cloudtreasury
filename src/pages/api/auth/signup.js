import { createRouter } from 'next-connect';
import AuthUsecases from '../../../src/usecases/AuthUsecases.mjs';
import { handleRequest } from '../../../src/core/index.mjs';

export default createRouter().post(handleRequest(AuthUsecases, 'signUp')).handler();

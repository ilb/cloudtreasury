import { createRouter } from 'next-connect';
import { handleRequest } from '../src/core/index.mjs';
import HeathbeatResponse from "../src/core/responses/HeartbeatResponse.mjs";
import HeartbeatUsecases from "../src/usecases/HeartbeatUsecases.mjs";

export default createRouter()
  .get(handleRequest(HeartbeatUsecases, 'test', [], HeathbeatResponse))
  .handler();

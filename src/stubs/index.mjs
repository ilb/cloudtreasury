import mfdHandlers from './mfd.mjs';
import {setupServer} from "msw/node";

const handlers = [
  process.env["apps.cloudtreasury.stub.mfdEnabled"] ? mfdHandlers : [],
].flat();

async function runServer (handlers) {
  const server = await setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });
}
runServer(handlers);

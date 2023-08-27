import stockValutionHandlers from './stockValution.mjs';
import {setupServer} from "msw/node";

const handlers = [
  process.env["apps.guarantees.stub.stockValution"] ? stockValutionHandlers : [],
].flat();
async function runServer (handlers) {
  const server = await setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });
}
runServer(handlers);

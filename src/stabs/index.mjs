import fairPriceCalcHandlers from './fairPriceCalc.mjs';
import {setupServer} from "msw/node";

const handlers = [
  process.env["apps.cloudtreasury.stub.fairPriceCalc"] ? fairPriceCalcHandlers : [],
].flat();

async function runServer (handlers) {
  const server = await setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });
}
runServer(handlers).then(console.log('msw start'));

// runBrowser(handlers);


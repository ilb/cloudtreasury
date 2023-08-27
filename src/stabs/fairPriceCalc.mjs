import path from 'path';
import {rest} from 'msw';
import {stubResponse} from 'msw-symlinked';

const stubPath = path.resolve(process.env['apps.cloudtreasury.stubpath'] || 'stabs');

export default [
  rest.get(RegExp(`https://mfd.ru/marketdata/endofday/5/(.*)`), () => stubResponse(`${stubPath}/calculate.200.json`)),
  // rest.post(RegExp(`/cloudtreasury(.*)/api/calculations`), () => stubResponse(`${stubPath}/calculate.200.json`)),
];

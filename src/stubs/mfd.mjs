import path from 'path';
import {rest} from 'msw';
import {stubResponse} from 'msw-symlinked';

const stubPath = path.resolve(process.env['apps.cloudtreasury.stubpath'] || 'stubs');

export default [
  rest.get(RegExp(`https://mfd.ru/marketdata/endofday/5/(.*)`), () => stubResponse(`${stubPath}/mfd/mfd.200.csv`)),
];

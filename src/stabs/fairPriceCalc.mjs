import path from 'path';
import {rest} from 'msw';
import {stubResponse} from 'msw-symlinked';

const stubPath = path.resolve(process.env['apps.cloudtreasury.stubpath'] || 'stabs');

export default [
  rest.post(`/cloudtreasury(.*)/api/offers/calculate`, () => stubResponse(`${stubPath}/dadata/getAddressSuggestions.200.json`)),
];

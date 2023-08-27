import path from 'path';
import {rest} from 'msw';
import {stubResponse} from 'msw-symlinked';

const stubPath = path.resolve(process.env['apps.guarantees.stubpath'] || 'stabs');
const dadataURL = process.env['apps.dadata.ws'];

export default [
  rest.post(`/cloudtreasury(.*)/api/`, () => stubResponse(`${stubPath}/dadata/getAddressSuggestions.200.json`)),
];

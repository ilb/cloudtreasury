import { env } from '../src/helpers/core.mjs';

export default {
	certs: [
		{
			name: 'loandeal',
			global: true,
			certfile: env('apps.loandeal.certfile'),
			passphrase: env('apps.loandeal.cert_PASSWORD'),
		},
		{
			name: 'bb',
			certfile: env('apps.loandeal.certbbfile'),
			passphrase: env('apps.loandeal.certbb_PASSWORD'),
			urls: [
				'apps.loanplatform.ws'
			]
		},
	],
};

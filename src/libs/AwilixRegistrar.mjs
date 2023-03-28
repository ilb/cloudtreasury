import glob from 'glob';
import path from 'path';
import { asClass, Lifetime } from 'awilix';

export default class AwilixRegistrar {
	container;

	constructor(container) {
		this.container = container;
	}

	async register() {
		for (const file of glob.sync('src/@(services|repositories|validators|providers|adapters)/*.mjs')) {
			const pathFile = path.parse(file);
			const name = pathFile.name;
			const folder = pathFile.dir.replace('src/', '');
			const instanceName = name[0].toLowerCase() + name.slice(1);
			const module = await import(`../${folder}/${name}.mjs`);

			this.container.register({
				[instanceName]: asClass(module.default, { lifetime: Lifetime.SCOPED })
			});
		}
	}
}

import { asValue, createContainer } from 'awilix';
import prisma from '../src/libs/prisma.mjs';
import AwilixRegistrar from '../src/libs/AwilixRegistrar.mjs';

export default class Kernel {
	constructor() {
		this.container = createContainer();
		this.awilixRegistrar = new AwilixRegistrar(this.container);
	}

	async createApplication() {
		await this.registerValues();
		await this.awilixRegistrar.register();

		return this.container;
	}

	async registerValues() {
		this.container.register({
			prisma: asValue(prisma),
			loanPlatformUrl: asValue(process.env['apps.loanplatform.ws']),
		});
	}
}
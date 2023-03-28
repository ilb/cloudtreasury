import Seeder from '../../src/core/Seeder.mjs';

export default class RelationSeeder extends Seeder {
	async run() {
		const relations = [
			{
				id: 1,
				businessEntityId: 1,
			}
		];

		await this.createMany(relations);
	}
}
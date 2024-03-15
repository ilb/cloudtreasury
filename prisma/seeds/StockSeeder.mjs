import Seeder from '../../src/core/Seeder.mjs';
import parseVolumes from './../../scripts/parser.mjs'

export default class StockSeeder extends Seeder {
  async run() {
    const volumes = await parseVolumes();

    for (const volume of volumes) {
      await this.create(volume);
    }
  }
}

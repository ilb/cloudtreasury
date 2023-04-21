import Repository from "../core/Repository.mjs";

export default class CalculationRepository extends Repository {
    async getAll() {
        return this.model.findMany({
            include: {
                stock: true
            }
        });
      }
}
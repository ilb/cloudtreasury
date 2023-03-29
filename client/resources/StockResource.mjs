import CrudResource from "./CrudResource.mjs";

export default class StockResource extends CrudResource {
  path = 'stocks';

  // static async createOrUpdate(currentStock) {
  //   //   if (currentStock.stock_id) {
  //   //     return this.update(currentStock.stock_id, currentStock);
  //   //   } else {
  //   //     return this.create(currentStock);
  //   //   }
  //   // }

}
import { IShoppingCartItem } from "../../models";
import { HttpClient } from "../HTTPClients";

export class CartItemService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async getCartItems(){
    return await this.get('basket-items')
  }

  async addCartItem(body: IShoppingCartItem){
    return await this.post(`add-basket-item`, body)
  }
}
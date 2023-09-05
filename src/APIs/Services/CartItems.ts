import { HttpClient } from "../HTTPClients";

export class CartItemService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async getCartItems(){
    return await this.get('basket-items')
  }

  async addCartItem(body: any){
    return await this.post(`add-basket-item`, body)
  }

  async reduceCartItem(body: any){
    return await this.post(`reduce-basket-item`, body)
  }

  async removeCartItem(productId:string){
    return await this.delete(`remove-basket-item`,productId)
  }
}
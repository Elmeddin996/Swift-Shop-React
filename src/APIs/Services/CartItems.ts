import { HttpClient } from "../HTTPClients";

export class CartItemService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getCartItems(){
    const token=localStorage.getItem("token")
    return await this.get('BasketItems/all',{headers: {
      Authorization: `Bearer  ${token}`
    }})
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
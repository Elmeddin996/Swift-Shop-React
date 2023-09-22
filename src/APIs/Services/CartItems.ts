import { HttpClient } from "../HTTPClients";

export class CartItemService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getCartItems(){
    const token=localStorage.getItem("token")
    return await this.getWithToken('BasketItems/all',{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

  async addCartItem(body: any){
    console.log(body);
    const token=localStorage.getItem("token")
    return await this.postWithToken(`BasketItems/add`, body,{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

  async reduceCartItem(body: any){
    const token=localStorage.getItem("token")
    return await this.postWithToken(`BasketItems/reduce`, body,{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

  async removeCartItem(productId:number){
    const token=localStorage.getItem("token")
    return await this.delete(`BasketItems`,productId,{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }
}
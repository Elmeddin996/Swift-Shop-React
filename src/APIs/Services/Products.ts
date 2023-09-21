import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getProductList(){
    const token=localStorage.getItem("token")
    return await this.get('Products/all',{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

  async getProductById(id:string){
    return await this.getById('Products',id)
  }
}
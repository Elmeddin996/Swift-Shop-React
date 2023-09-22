import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getProductList(){
    return await this.get('Products/all')
  }

  async getProductById(id:string){
    return await this.getById('Products',id)
  }
}
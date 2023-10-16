import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`http://elmeddin96-001-site1.htempurl.com/api`);
  }

  async getProductList(){
    return await this.get('Products/all')
  }

  async getProductById(id:string){
    return await this.getById('Products',id)
  }
}
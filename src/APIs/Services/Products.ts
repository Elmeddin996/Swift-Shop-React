import { HttpClient } from "../HTTPClients";

export class ProductService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async getProductList(){
    return await this.get('products')
  }
}
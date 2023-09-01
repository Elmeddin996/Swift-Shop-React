import { HttpClient } from "../HTTPClients";

export class BrandService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async getBrandList(){
    return await this.get('brands')
  }

}
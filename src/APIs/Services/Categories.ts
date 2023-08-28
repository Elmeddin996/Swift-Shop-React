import { HttpClient } from "../HTTPClients";

export class CategoryService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async getCategoryList(){
    return await this.get('categories')
  }

}
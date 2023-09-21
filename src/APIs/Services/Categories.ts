import { HttpClient } from "../HTTPClients";

export class CategoryService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getCategoryList(){
    const token=localStorage.getItem("token")
    return await this.get('Categories/all',{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

}
import { HttpClient } from "../HTTPClients";

export class SiteDatasService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getSiteDatas(){
    const token=localStorage.getItem("token")
    return await this.get('StoreDatas/Get',{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }
}
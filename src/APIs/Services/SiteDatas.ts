import { HttpClient } from "../HTTPClients";

export class SiteDatasService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getSiteDatas(){
    return await this.get('StoreDatas/Get')
  }
}
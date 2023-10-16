import { HttpClient } from "../HTTPClients";

export class SiteDatasService extends HttpClient {
  constructor() {
    super(`http://elmeddin96-001-site1.htempurl.com/api`);
  }

  async getSiteDatas(){
    return await this.get('StoreDatas/Get')
  }
}
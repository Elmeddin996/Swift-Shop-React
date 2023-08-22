import { HttpClient } from "../HTTPClients";

export class SiteDatasService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  async getSiteDatas(){
    return await this.get('sitedatas')
  }
}
import { HttpClient } from "../HTTPClients";

export class SliderService extends HttpClient {
  constructor() {
    super(`http://elmeddin96-001-site1.htempurl.com/api`);
  }

  async getSlider(){
    return await this.get('Sliders/all')
  }
}
import { HttpClient } from "../HTTPClients";

export class SliderService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async getSlider(){
    return await this.get('Sliders/all')
  }
}
import { HttpClient } from "../HTTPClients";

export class OrderService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api`);
  }

  async createOrder(body: any) {
    const token = localStorage.getItem("token");
    if (Boolean(token)) {
      return await this.postWithTokenBody(`Orders/CreateOrder`, body, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      });
    } else {
      return await this.post(`Orders/CreateOrder`, body);
    }
  }
}

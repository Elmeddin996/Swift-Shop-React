import { HttpClient } from "../HTTPClients";

export class OrderService extends HttpClient {
  constructor() {
    super(`http://elmeddin96-001-site1.htempurl.com/api`);
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

import { ILogin, IUserData} from "../../models";
import { HttpClient } from "../HTTPClients";

export class AuthService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

  
  async register(body: IUserData){
    return await this.post(`signup`, body)
  }

  async login(body: ILogin) {
    return await this.post(`login`, body).then(({ data }) =>{
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
    });
  }

  async logout(userId: string) {
    return await this.post(`logout`, userId).then(()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
    })
  }
}
 
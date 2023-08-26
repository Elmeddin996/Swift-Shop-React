import { ILogin} from "../../models";
import { HttpClient } from "../HTTPClients";

export class AuthService extends HttpClient {
  constructor() {
    super(`http://localhost:3001`);
  }

//   async createNewAdmin(body: ILogin){
//     return await this.post(`signup`, body)
//   }

  async login(body: ILogin) {
    return await this.post(`login`, body).then(({ data }) =>{
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
    });
  }

//   async logout(body: IUserLogoutData) {
//     return await this.post(`logout`, body).then(()=>{
//       localStorage.removeItem("token")
//       localStorage.removeItem("userId")
//     })
//   }
}
 
import { ILogin, IUserData} from "../../models";
import { HttpClient } from "../HTTPClients";

export class AuthService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api/Auth`);
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

  async logout() {
   const token=localStorage.getItem("token")
    return await this.get(`Logout`,{headers: {
      Authorization: `Bearer  ${token}`
    }}).then(()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
    })
  }

  async getUserById(id:string){
    return await this.getById('user',id)
  }

  async userDataUpdate(body:IUserData){
    return await this.post("update-user", body)
  }

  async updatePassword(id:string, body:any){
    return await this.put("password",id,body)
  }
}
 
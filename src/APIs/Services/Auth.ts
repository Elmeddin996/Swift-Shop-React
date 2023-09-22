import { ILogin, IUserData} from "../../models";
import { HttpClient } from "../HTTPClients";

export class AuthService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api/Auth`);
  }

  
  async register(body: IUserData){
    return await this.post(`Register`, body)
  }

  async login(body: ILogin) {
    return await this.post(`login`, body).then(({ data }) =>{
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
    });
  }

  async logout() {
   const token=localStorage.getItem("token")
    return await this.getWithToken(`Logout`,{headers: {
      Authorization: `Bearer  ${token}`
    }}).then(()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
    })
  }

  async getUserData(){
    const token=localStorage.getItem("token")
    return await this.getWithToken(`UserData`,{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

  async userDataUpdate(body:IUserData){
    const token=localStorage.getItem("token")
    return await this.put("UserEdit", body,{headers: {
      Authorization: `Bearer  ${token}`
    }})
  }

  async updatePassword(id:string, body:any){
    return await this.put("password",id,body)
  }
}
 
import { HttpClient } from "../HTTPClients";

export class AccountService extends HttpClient {
  constructor() {
    super(`https://localhost:7267/api/Accounts`);
  }

  async forgotPassword(body:any){
   return await this.post(`forgotpassword`,body)
  }

  async resetPasswordChange(body:any){
    return await this.post(`ResetPasswordChange`,body)
   }

   async sendConfirmEmailToken(){
    const token=localStorage.getItem("token")
     return await this.postWithToken(`SendConfirmEmailToken`,{headers: {
      Authorization: `Bearer  ${token}`
    }})
   }
}
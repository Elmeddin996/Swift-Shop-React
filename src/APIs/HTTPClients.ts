import axios from "axios";


export class HttpClient{  
    baseUrl:string;
    constructor(url:string){
        this.baseUrl=url;
    }

    async get(endpoint:string){
        return await axios.get(`${this.baseUrl}/${endpoint}`);
    }
    async getWithToken(endpoint:string,header:any){
        return await axios.get(`${this.baseUrl}/${endpoint}`,header);
    }
    async getById(endpoint:string, id:string){
        return await axios.get(`${this.baseUrl}/${endpoint}/${id}`);
    }

    async post(endpoint:string,body:any){
        return await axios.post(`${this.baseUrl}/${endpoint}`,body);
    }
    async postWithToken(endpoint:string,body:any,header:any){
        return await axios.post(`${this.baseUrl}/${endpoint}`,body,header);
    }
    
    async put(endpoint:string,body:any,header:any){
        return await axios.put(`${this.baseUrl}/${endpoint}`,body,header);
    }

    async putById(endpoint:string,id:string, body:any){
        return await axios.put(`${this.baseUrl}/${endpoint}/${id}`,body);
    }

    async delete(endpoint:string,id:number|string,header:any){
        return await axios.delete(`${this.baseUrl}/${endpoint}/${id}`,header)
    }
}


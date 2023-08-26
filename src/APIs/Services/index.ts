import { AuthService } from "./Auth";
import { ProductService } from "./Products";
import { SiteDatasService } from "./SiteDatas";

export const useService =()=>{
    const services={
        productService: new ProductService(),
        authService: new  AuthService(),
        siteDatasService: new SiteDatasService()
    };

    return services;
}
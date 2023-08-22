import { ProductService } from "./Products";
import { SiteDatasService } from "./SiteDatas";

export const useService =()=>{
    const services={
        productService: new ProductService(),
        siteDatasService: new SiteDatasService()
    };

    return services;
}
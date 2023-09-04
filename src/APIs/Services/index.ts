import { AuthService } from "./Auth";
import { BrandService } from "./Brands";
import { CartItemService } from "./CartItems";
import { CategoryService } from "./Categories";
import { ProductService } from "./Products";
import { SiteDatasService } from "./SiteDatas";

export const useService =()=>{
    const services={
        productService: new ProductService(),
        authService: new  AuthService(),
        siteDatasService: new SiteDatasService(),
        categoriesService: new CategoryService(),
        brandsService: new BrandService(),
        cartItemService: new CartItemService()
    };

    return services;
}
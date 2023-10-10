import { AccountService } from "./Account";
import { AuthService } from "./Auth";
import { BrandService } from "./Brands";
import { CartItemService } from "./CartItems";
import { CategoryService } from "./Categories";
import { OrderService } from "./Order";
import { ProductService } from "./Products";
import { SiteDatasService } from "./SiteDatas";
import { SliderService } from "./Slider";

export const useService =()=>{
    const services={
        productService: new ProductService(),
        authService: new  AuthService(),
        accountService: new  AccountService(),
        siteDatasService: new SiteDatasService(),
        categoriesService: new CategoryService(),
        brandsService: new BrandService(),
        cartItemService: new CartItemService(),
        orderService: new OrderService(),
        sliderService: new SliderService()
    };

    return services;
}
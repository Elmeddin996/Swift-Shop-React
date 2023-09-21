export interface IProduct {
  id: string;
  name: string;
  description: string;
  salePrice: number;
  discountPercent: number;
  rating?: number;
  stock?: number;
  brand: {
    id:number;
    name:string;
  };
  category:{
    id:number;
    name:string;
  };
  imageUrl: string;
  imageUrls?: [string];
}
export interface ICartProduct {
  id: string;
  name: string;
  count:number;
  description: string;
  salePrice: number;
  discountPercent: number;
  rating?: number;
  stock?: number;
  brand: {
    id:number;
    name:string;
  };
  category:{
    id:number;
    name:string;
  };
  imageUrl: string;
  imageUrls?: [string];
}

export interface ICategory {
  id: string;
  name: string;
  brands: IBrand[];
}

export interface IShoppingCartItem{
  id?: string,
  productId: string,
  userId?: string,
  count: number
}

export interface IBrand {
  id: string;
  name: string;
}

export interface IBrandCategoryProps {
  productList: IProduct[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setSelectedFilterValue: React.Dispatch<React.SetStateAction<string>>;
  selectedFilterValue: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILogout{
  email: string;
  fullName: string;
  username: string;
}

export interface IUserData {
  username: string;
  fullName: string;
  email: string;
  currentPassword: string;
  confirmPassword?: string;
  address: string;
  phone: string;
}

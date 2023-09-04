export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock?: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: [string];
}
export interface ICartProduct {
  id: string;
  title: string;
  count:number;
  description: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  stock?: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: [string];
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
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
}

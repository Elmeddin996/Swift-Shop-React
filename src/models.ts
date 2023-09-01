export interface IProduct{
    id: string,
    title: String,
    description: String,
    price: number,
    discountPercentage: number,
    rating?: Number,
    stock?: Number,
    brand: String,
    category: String,
    thumbnail: string,
    images?: [string]
}

export interface ICategory{
    id:string,
    name:string,
    brands:IBrand[]
}

export interface IBrand{
    id:string,
    name:string
}

export interface IBrandCategoryProps {
    productList: IProduct[];
    setFilteredProducts:React.Dispatch<React.SetStateAction<IProduct[]>>;
    setSelectedFilterValue: React.Dispatch<React.SetStateAction<string>>;
    selectedFilterValue: string;
  }


export interface ILogin{
    email:string;
    password:string;
}
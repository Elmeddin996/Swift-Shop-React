export interface IProduct{
    id: Number,
    title: String,
    description: String,
    price: Number,
    discountPercentage?: Number,
    rating?: Number,
    stock?: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images?: [String]
}
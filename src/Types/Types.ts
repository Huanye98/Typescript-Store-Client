export interface Product {
  id: number;
  name: string;
  imageurl: string;
  finalPrice: number;
  description: string;
  discountvalue: number;
  stock: number;
  isavaliable: boolean;
  isFeatured: boolean;
  category: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cartId: string;
}


export interface Product {
  id: string;
  name: string;
  imageurl: string;
  finalPrice: number;
  description: string;
  discountValue: number;
  category: string;
  stock: number;
  isFeatured: boolean;
  isAvailable: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cartId: string;
}


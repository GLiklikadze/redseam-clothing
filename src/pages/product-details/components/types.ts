export interface Product {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[];
  total_price: number;
  quantity: number;
  color: string;
  size: string;
}

export type ProductArray = Product[];

export interface ProductWithSpecificTypes {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: Color[];
  available_sizes: Size[];
  total_price: number;
  quantity: number;
  color: Color;
  size: Size;
}

export type Color = "White" | "Blue" | "Black" | "Red" | "Green" | "Yellow";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

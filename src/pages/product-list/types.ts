export interface Product {
  id: number;
  name: string;
  cover_image: string;
  release_year: string;
  image: string;
  price: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface Meta {
  current_page: number;
  current_page_url: string;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

export interface ProductsResponse {
  data: Product[];
  links: Links;
  meta: Meta;
}

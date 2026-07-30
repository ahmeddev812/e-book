export interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  description: string;
  pages: string;
  language: string;
  published: string;
  format: string;
  isbn: string;
  publisher: string;
  dimensions: string;
  weight: string;
  rating: string;
  reviews: string;
  themes?: string[];
  authorBio?: string;
  authorImage?: string;
  authorAwards?: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  author: string;
  quantity: number;
}

export interface Filters {
  categories: string[];
  priceRange: { min: number; max: number };
  authors: string[];
  rating: number | null;
}

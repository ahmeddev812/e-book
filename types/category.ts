import type { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  count: number;
  gradient: string;
  desc: string;
  image: string;
  bookIds: string[];
  trending?: boolean;
  featured?: boolean;
  color: string;
  lightBg: string;
  textColor: string;
}

export interface CategoryHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  totalCategories: number;
}

export interface CategoryCarouselProps {
  categories: Category[];
  autoRotate?: boolean;
  rotateInterval?: number;
}

export interface CategoryCardPremiumProps {
  name: string;
  desc: string;
  href: string;
  count: number;
  gradient: string;
  icon: LucideIcon;
  image: string;
  miniCovers: string[];
  index: number;
  isTrending?: boolean;
  isFeatured?: boolean;
}

export interface TrendingCategoriesProps {
  categories: Category[];
}

export interface PersonalizedCategoriesProps {
  categories: Category[];
  isLoading?: boolean;
}

export interface CategorySpotlightProps {
  category: Category;
  autoNavigate?: boolean;
}

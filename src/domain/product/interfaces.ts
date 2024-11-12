export interface ProductFilter {
  title?: string;
  categoryId?: string;
  price_max?: string | number;
  price_min?: string | number;
  offset?: string | number;
}
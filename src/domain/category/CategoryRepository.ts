import { Product } from '@/domain/product/ProductType';
import { Category } from './CategoryType';

export class CategoryRepository {
  private apiUrl = 'https://api.escuelajs.co/api/v1/categories';
  private limit = 20;

  async fetchProductsByCategory(id: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/products?limit=${this.limit}&offset=0`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async fetchCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.apiUrl}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

}


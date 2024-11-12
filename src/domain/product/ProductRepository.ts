// src/domain/product/ProductRepository.ts
import { Product } from '@/domain/product/ProductType';

export class ProductRepository {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private limit = 20;

  async fetchProducts(query: string): Promise<Product[]> {
    try {
      const response = await fetch(`${this.apiUrl}?limit=${this.limit}&${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async fetchProductsByCategory(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.apiUrl}?limit=${this.limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async fetchProduct(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }
}


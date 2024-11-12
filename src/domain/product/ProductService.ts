// src/domain/product/ProductService.ts
import { ProductFilter } from './interfaces';
import { ProductRepository } from './ProductRepository';
import { Product } from './ProductType';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts(params: ProductFilter): Promise<Product[]> {
    const query = this.toQueryString(params);
    return this.productRepository.fetchProducts(query);
  }

  async getProduct(id: string): Promise<Product | null> {
    return this.productRepository.fetchProduct(id);
  }

  toQueryString(params: ProductFilter): string {
    const query = new URLSearchParams();
    if (params.title) query.append('title', params.title)
    if (params.categoryId) query.append('categoryId', params.categoryId)
    if (params.price_max) query.append('price_max', params.price_max as string);
    if (params.price_min) query.append('price_min', params.price_min as string);
    if (params.offset) { 
      query.append('offset', params.offset as string);
    } else { 
      query.append('offset', '0');
    }

    return query.toString()
  }
}

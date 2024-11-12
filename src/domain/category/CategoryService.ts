import { CategoryRepository } from './CategoryRepository';
import { Product } from '@/domain/product/ProductType';
import { Category } from './CategoryType';

export class CategoryService {
  private CategoryRepository: CategoryRepository;

  constructor() {
    this.CategoryRepository = new CategoryRepository();
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.CategoryRepository.fetchProductsByCategory(categoryId);
  }

  async getCategories(): Promise<Category[]> {
    return this.CategoryRepository.fetchCategories();
  }
}

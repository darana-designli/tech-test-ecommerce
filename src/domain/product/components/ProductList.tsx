import Link from 'next/link';

import { Product } from "@/domain/product/ProductType";
import { ProductCard } from "./ProductCard";
import { ProductsFilter } from './ProductsFilter';
import { CategoryService } from '@/domain/category/CategoryService';
import { NoProductsError } from './NoProductsError';
import { Pagination } from './ProductPagination';

interface Props {
  products: Product[];
}

export const ProductList = async ({ products }: Props) => {
  const categoryService = new CategoryService();
  const categories = await categoryService.getCategories();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{products.length} product results</h2>
          <ProductsFilter categories={categories} />
        </div>

        {
          products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="group">
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
              <Pagination totalPages={10} />
            </>
          ) : (
            <NoProductsError title="Products not found" description="Sorry, we couldn’t find the products you’re looking for." />
          )
        }
      </div>
    </div>
  );
};

import React from 'react';
import { ProductList } from "@/domain/product/components/ProductList";
import { CategoryService } from "@/domain/category/CategoryService";

const ProductsByCategoryList = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const categoryService = new CategoryService();
  const products = await categoryService.getProductsByCategory(id);
  
  return (
    <div className="container mx-auto p-4">
      <ProductList products={products} />
    </div>
  );
};

export default ProductsByCategoryList;

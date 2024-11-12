import { ProductList } from "@/domain/product/components/ProductList";
import { ProductService } from "@/domain/product/ProductService";

interface Props {
  searchParams: { title?: string }
}

const Products = async ({ searchParams }: Props) => {
  const queryParams = await searchParams;
  const productService = new ProductService();
  const products = await productService.getProducts(queryParams);

  return (
    <div className="container mx-auto p-4">
      <ProductList products={products} />
    </div>
  );
};

export default Products;

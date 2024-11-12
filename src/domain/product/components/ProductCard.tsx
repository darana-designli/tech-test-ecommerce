/* eslint-disable @next/next/no-img-element */
/* Next Image require that the src came from a known source or whitelist the domain */
import { AddToCart } from "@/domain/cart/components/AddToCart";
import { Product } from "@/domain/product/ProductType";
import { cleanImageUrl, formatPrice } from "@/domain/product/utils/productUtils";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        
        <img
          alt={product.title}
          src={cleanImageUrl(product.images[0])}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-base text-gray-700 mb-2 font-bold">{product.title}</h3>
      <span className="bg-blue-200 py-1 px-2 rounded-full border border-blue-500 text-blue-500 text-xs">{product.category.name}</span>
      <p className="mt-1 text-lg font-medium text-gray-900 mt-1">{formatPrice(product.price)}</p>
      <AddToCart product={product} />
    </>
  );
};

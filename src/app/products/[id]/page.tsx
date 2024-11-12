/* eslint-disable @next/next/no-img-element */
/* Next Image require that the src came from a known source or whitelist the domain */
import Link from 'next/link';

import { ProductService } from '@/domain/product/ProductService';
import { cleanImageUrl, formatPrice } from '@/domain/product/utils/productUtils';
import { NoProductsError } from '@/domain/product/components/NoProductsError';
import { AddToCart } from '@/domain/cart/components/AddToCart';

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const productService = new ProductService();
  const product = await productService.getProduct(id)

  if(!product) return <NoProductsError title="Product not found" description="Sorry, we couldn’t find the product you’re looking for." redirectTo="/" />

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <Link href="/" className="mr-2 text-sm font-medium text-gray-900">
                  Home
                </Link>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <Link href={`/products/${product.id}`} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.title}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 px-4">
          {
            product.images.map((image, index) => (
              <div key={index} className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block my-2">
                <img
                  alt={product.title}
                  src={cleanImageUrl(image)}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))
          }
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-3">{product.title}</h1>
            <span className="bg-blue-200 py-2 px-4 rounded-full border border-blue-500 text-blue-500">{product.category.name}</span>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 mb-4">{formatPrice(product.price)}</p>
            <AddToCart product={product} />
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

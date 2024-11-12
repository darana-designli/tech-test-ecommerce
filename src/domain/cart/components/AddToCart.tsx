'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button'
import { Product } from '@/domain/product/ProductType';
import { useCartStore } from '@/store/cart';
import { useToast } from "@/hooks/use-toast"

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);
  const { addToCart, isProductInCart, removeFromCart } = useCartStore();
  const { toast } = useToast();
  const isCurrentProductInCart = isProductInCart(product.id);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(isCurrentProductInCart) {
      removeFromCart(product.id)
      toast({
        title: "Product removed successfully.",
        description: "The product was removed from the cart",
      })
      return;
    }

    addToCart(product);
    toast({
      title: "Product added successfully.",
      description: "The product was added from the cart",
    })
  }

  const getBtnText = () => {
    return isCurrentProductInCart ? 'Remove from cart' : 'Add to cart'
  }

  if (!hasMounted) {
    return null;
  }

  return (
    <Button className="w-full mt-2 bg-blue-500 font-bold uppercase" onClick={handleAddToCart}>{getBtnText()}</Button>
  )
}

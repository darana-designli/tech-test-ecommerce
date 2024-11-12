'use client';

import { useState } from 'react';

import { useCartStore } from '@/store/cart';
import { Cart } from './Cart';

export const CartIcon: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { items } = useCartStore();

  const handleOpenCart = () => {
    setOpen(true);
  }

  return (
    <>
      <div onClick={handleOpenCart} className="group -m-2 flex items-center p-2 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{items.length}</span>
        <span className="sr-only">items in cart, view bag</span>
      </div>
      <Cart open={open} setOpen={setOpen} />
    </>
  );
};

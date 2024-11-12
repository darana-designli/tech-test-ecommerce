'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import Link from "next/link"

import { Category } from '@/domain/category/CategoryType';

interface Props {
  navigation: {
    categories: Category[]
  },
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const MobileMenu = ({ navigation, open, setOpen }: Props) => {

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
        >
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close menu</span>
              <span>X</span>
            </button>
          </div>

          <div className="flex flex-col h-full px-8">
            {navigation.categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="flex items-center text-base font-medium text-gray-700 hover:text-gray-800 my-2"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
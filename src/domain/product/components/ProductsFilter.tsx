'use client'

import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "../utils/productUtils";
import { Category } from "@/domain/category/CategoryType";
import { useQueryParams } from "@/hooks/useQueryParams";

interface Props {
  categories: Category[];
}

const MAX_PRICE = 250;

export const ProductsFilter = ({ categories }: Props) => {
  const [open, setOpen] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(MAX_PRICE);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { setQueryParams } = useQueryParams();  

  const onClearFilter = () => {
    setSelectedPrice(MAX_PRICE);
    setSelectedCategory(null);
  }

  const onFilter = () => {
    setQueryParams({
      price_min: 0,
      price_max: selectedPrice,
      categoryId: selectedCategory! as string,
    })

    setOpen(false);
  }

  return (
    <>
      <button data-testid="products-filter" onClick={() => setOpen(!open)} className="flex items-center border border-blue-500 text-blue-500 px-6 py-2 rounded font-bold text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        Filters
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900">Filters</DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <p className="mb-2">Filter by price</p>
                    <Slider defaultValue={[MAX_PRICE]} max={MAX_PRICE} step={1} onValueChange={(e) => setSelectedPrice(e[0])} />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">{formatPrice(0)}</span>
                      <span className="text-sm">{formatPrice(MAX_PRICE)}</span>
                    </div>

                    <p className="mt-4 mb-2">Filter by category</p>
                    <div className="space-y-6">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            id={`filter-mobile-${category.id}`}
                            name="categoryId"
                            type="radio"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            defaultValue={category.id}
                            defaultChecked={category.id === selectedCategory}
                            onChange={(e) => setSelectedCategory(e?.target?.value)}
                          />
                          <label
                            htmlFor={`filter-mobile-${category.id}`}
                            className="ml-3 min-w-0 flex-1 text-gray-900"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between px-4 sm:px-6">
                    <button onClick={onClearFilter} className="flex flex-1 items-center border border-blue-500 text-blue-500 px-6 py-2 rounded font-bold text-lg mr-1 justify-center">
                      Clear
                    </button>
                    <button onClick={onFilter} className="flex flex-1 items-center bg-blue-500 border border-blue-500 text-white px-6 py-2 rounded font-bold text-lg ml-1 justify-center">
                      Apply
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

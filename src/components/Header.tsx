'use client'

import { useState } from 'react'

import { SearchInput } from './SearchInput'
import { MobileMenu } from './MobileMenu'
import { Logo } from './Logo'
import { DesktopMenu } from './DesktopMenu'
import { navigation } from '@/constants/navigation'
import { CartIcon } from '@/domain/cart/components/CartIcon'

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      <MobileMenu navigation={navigation} open={open} setOpen={setOpen} />

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-gray-900 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          This is a test
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex flex-row h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 50 50" className="fill-black">
                  <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
                </svg>
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Logo />
              </div>

              <DesktopMenu navigation={navigation} />

              <div className="ml-auto flex items-center">
                <SearchInput />

                <div className="ml-4 flow-root lg:ml-6">
                  <CartIcon />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

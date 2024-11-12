import {
  PopoverGroup,
} from '@headlessui/react'
import Link from 'next/link'

import { Category } from '@/domain/category/CategoryType'

interface Props {
  navigation: {
    categories: Category[]
  },
}

export const DesktopMenu = ({ navigation }: Props) => {
  return (
    <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {navigation.categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </PopoverGroup>
  )
}

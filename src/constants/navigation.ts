import { Category } from "@/domain/category/CategoryType";

interface CategoriesMenu {
  categories: Category[];
}

export const navigation: CategoriesMenu = {
  categories: [
    {
      id: '1',
      title: 'Clothes',
    },
    {
      id: '2',
      title: 'Electronics',
    },
    {
      id: '4',
      title: 'Shoes',
    },
  ],
}

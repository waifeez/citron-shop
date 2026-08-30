import type { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Плюшевый мишка',
    slug: 'plush-bear',
    description: 'Мягкий плюшевый мишка 40см',
    price: 350,
    effectivePrice: 350,
    stockQuantity: 12,
    isActive: true,
    isFeatured: true,
    categoryId: 'toys',
    categoryName: 'Игрушки',
    imageUrls: []
  },
  {
    id: '2',
    name: 'Набор для рисования',
    slug: 'drawing-set',
    description: 'Набор карандашей и красок для детей',
    price: 220,
    discountPrice: 180,
    effectivePrice: 180,
    stockQuantity: 5,
    isActive: true,
    isFeatured: false,
    categoryId: 'toys',
    categoryName: 'Игрушки',
    imageUrls: []
  },
  {
    id: '3',
    name: 'Подарочная кружка',
    slug: 'gift-mug',
    description: 'Керамическая кружка с принтом',
    price: 150,
    effectivePrice: 150,
    stockQuantity: 30,
    isActive: true,
    isFeatured: false,
    categoryId: 'gifts',
    categoryName: 'Подарки',
    imageUrls: []
  }
];
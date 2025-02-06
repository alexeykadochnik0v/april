export interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  brand: string
  category: string
  stock: number
  rating: number
  // Добавьте другие необходимые поля в соответствии с вашим API
}

export type ViewMode = 'grid' | 'list'

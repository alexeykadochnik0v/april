import axios from 'axios'
import type { Product } from '~/types'

interface DummyJSONResponse {
  products: {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string
    brand: string
    category: string
    stock: number
    rating: number
  }[]
  total: number
  skip: number
  limit: number
}

export const useApi = () => {
  const baseUrl = 'https://dummyjson.com'
  const api = axios.create({
    baseURL: baseUrl
  })
  
  const fetchProducts = async (): Promise<Product[]> => {
    try {
      console.log('Making API request to /products')
      const { data } = await api.get<DummyJSONResponse>('/products')
      console.log('API response:', data)
      
      return data.products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.thumbnail,
        brand: product.brand,
        category: product.category,
        stock: product.stock,
        rating: product.rating
      }))
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  const fetchProductById = async (id: number): Promise<Product> => {
    try {
      const { data: product } = await api.get(`/products/${id}`)
      
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.thumbnail,
        brand: product.brand,
        category: product.category,
        stock: product.stock,
        rating: product.rating
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  }

  return {
    fetchProducts,
    fetchProductById
  }
}

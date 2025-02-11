/**
 * Composable для работы с API DummyJSON
 * Предоставляет методы для получения данных о продуктах
 */

import axios from 'axios'
import type { Product } from '~/types'

// Интерфейс ответа от DummyJSON API
interface DummyJSONResponse {
  products: {
    id: number
    title: string
    description: string
    price: number
    thumbnail: string    // В API это thumbnail, но мы маппим в image
    brand: string
    category: string
    stock: number
    rating: number
  }[]
  total: number         // Общее количество продуктов
  skip: number          // Сколько продуктов пропущено (для пагинации)
  limit: number         // Лимит продуктов на странице
}

export const useApi = () => {
  // Базовый URL API
  const baseUrl = 'https://dummyjson.com'
  
  // Создаем экземпляр axios с предустановленным baseURL
  const api = axios.create({
    baseURL: baseUrl
  })
  
  /**
   * Получает список всех продуктов
   * Маппит данные из формата API в формат приложения
   */
  const fetchProducts = async (): Promise<Product[]> => {
    try {
      console.log('Making API request to /products')
      const { data } = await api.get<DummyJSONResponse>('/products')
      console.log('API response:', data)
      
      // Маппинг данных из формата API в формат приложения
      return data.products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.thumbnail,  // Переименовываем thumbnail в image
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

  /**
   * Получает продукт по его ID
   * @param id - ID продукта
   */
  const fetchProductById = async (id: number): Promise<Product> => {
    try {
      const { data: product } = await api.get(`/products/${id}`)
      
      // Маппинг данных из формата API в формат приложения
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

  // Возвращаем методы API
  return {
    fetchProducts,
    fetchProductById
  }
}

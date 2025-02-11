/**
 * Composable для реализации поиска по продуктам
 * Предоставляет функционал фильтрации списка продуктов по поисковому запросу
 */

import { ref, computed } from 'vue'
import type { Product } from '~/types'
import type { Ref } from 'vue'

/**
 * @param items - Реактивный массив продуктов для поиска
 */
export const useSearch = (items: Ref<Product[]>) => {
  // Текущий поисковый запрос
  const searchQuery = ref('')
  
  /**
   * Отфильтрованные элементы на основе поискового запроса
   * Поиск осуществляется по всем текстовым полям продукта
   */
  const filteredItems = computed(() => {
    console.log('useSearch - computing filteredItems:', {
      itemsLength: items.value?.length,
      searchQuery: searchQuery.value
    })

    // Если нет элементов, возвращаем пустой массив
    if (!items.value?.length) return []
    // Если нет поискового запроса, возвращаем все элементы
    if (!searchQuery.value.trim()) return items.value
    
    // Разбиваем поисковый запрос на отдельные слова
    const query = searchQuery.value.toLowerCase().trim()
    const searchTerms = query.split(' ').filter(term => term.length > 0)
    
    // Фильтруем продукты
    const filtered = items.value.filter(item => {
      // Объединяем все текстовые поля продукта в одну строку для поиска
      const searchableText = [
        item.title,
        item.description,
        item.brand,
        item.category,
        `$${item.price}`,           // Добавляем знак доллара для поиска по цене
        `${item.rating} stars`,     // Добавляем слово "stars" для поиска по рейтингу
        `${item.stock} in stock`    // Добавляем "in stock" для поиска по наличию
      ].join(' ').toLowerCase()
      
      // Проверяем, что все слова из поискового запроса присутствуют в тексте
      return searchTerms.every(term => searchableText.includes(term))
    })

    console.log('useSearch - filtered results:', {
      query,
      terms: searchTerms,
      resultsLength: filtered.length
    })

    return filtered
  })
  
  /**
   * Устанавливает новый поисковый запрос
   * @param query - Новый поисковый запрос
   */
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }
  
  return {
    searchQuery,      // Текущий поисковый запрос (ref)
    filteredItems,    // Отфильтрованные элементы (computed)
    setSearchQuery    // Метод для установки поискового запроса
  }
}

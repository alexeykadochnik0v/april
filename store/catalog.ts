/**
 * Store для управления каталогом продуктов
 * Использует Pinia для управления состоянием
 * 
 * Отвечает за:
 * - Хранение списка продуктов
 * - Фильтрацию и поиск
 * - Пагинацию
 * - Режим отображения (сетка/список)
 */

import { defineStore } from 'pinia'
import type { Product, ViewMode } from '~/types'

/**
 * Интерфейс состояния каталога
 */
interface CatalogState {
  items: Product[]           // Список всех продуктов
  loading: boolean          // Флаг загрузки
  error: string | null      // Сообщение об ошибке
  currentPage: number       // Текущая страница
  itemsPerPage: number      // Количество продуктов на странице
  viewMode: ViewMode        // Режим отображения (сетка/список)
  searchQuery: string       // Поисковый запрос
}

export const useCatalogStore = defineStore('catalog', {
  /**
   * Начальное состояние store
   */
  state: (): CatalogState => ({
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 9,        // 9 продуктов для сетки 3x3
    viewMode: 'grid',
    searchQuery: ''
  }),

  /**
   * Геттеры - вычисляемые свойства store
   * Автоматически пересчитываются при изменении зависимостей
   */
  getters: {
    /**
     * Фильтрует продукты по поисковому запросу
     * Поиск происходит по всем текстовым полям продукта
     */
    filteredItems(state): Product[] {
      if (!state.searchQuery.trim()) return state.items

      const query = state.searchQuery.toLowerCase().trim()
      const searchTerms = query.split(' ').filter(term => term.length > 0)

      return state.items.filter(item => {
        // Объединяем все поля продукта в одну строку для поиска
        const searchableText = [
          item.title,
          item.description,
          item.brand,
          item.category,
          `$${item.price}`,           // Добавляем $ для поиска по цене
          `${item.rating} stars`,     // Добавляем "stars" для поиска по рейтингу
          `${item.stock} in stock`    // Добавляем "in stock" для поиска по наличию
        ].join(' ').toLowerCase()

        // Проверяем наличие всех поисковых терминов
        return searchTerms.every(term => searchableText.includes(term))
      })
    },

    /**
     * Возвращает продукты для текущей страницы
     * Учитывает фильтрацию и пагинацию
     */
    paginatedItems(state): Product[] {
      const filtered = this.filteredItems
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return filtered.slice(start, end)
    },

    /**
     * Вычисляет общее количество страниц
     * на основе отфильтрованных продуктов
     */
    totalPages(state): number {
      return Math.ceil(this.filteredItems.length / state.itemsPerPage)
    }
  },

  /**
   * Actions - методы для изменения состояния
   * Могут быть асинхронными
   */
  actions: {
    /**
     * Загружает список продуктов с API
     * Обновляет состояние загрузки и ошибки
     */
    async fetchItems() {
      this.loading = true
      this.error = null
      try {
        const api = useApi()
        this.items = await api.fetchProducts()
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    /**
     * Устанавливает режим отображения (сетка/список)
     * @param mode - Новый режим отображения
     */
    setViewMode(mode: ViewMode) {
      this.viewMode = mode
    },

    /**
     * Устанавливает поисковый запрос
     * Сбрасывает пагинацию на первую страницу
     * @param query - Новый поисковый запрос
     */
    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1  // Сброс на первую страницу при поиске
    },

    /**
     * Устанавливает текущую страницу пагинации
     * @param page - Номер страницы
     */
    setPage(page: number) {
      this.currentPage = page
    }
  }
})

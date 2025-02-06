import { defineStore } from 'pinia'
import type { Product, ViewMode } from '~/types'

interface CatalogState {
  items: Product[]
  loading: boolean
  error: string | null
  currentPage: number
  itemsPerPage: number
  viewMode: ViewMode
  searchQuery: string
}

export const useCatalogStore = defineStore('catalog', {
  state: (): CatalogState => ({
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 9, // Изменили с 10 на 9 для сетки 3x3
    viewMode: 'grid',
    searchQuery: ''
  }),

  getters: {
    filteredItems(state): Product[] {
      if (!state.searchQuery.trim()) return state.items

      const query = state.searchQuery.toLowerCase().trim()
      const searchTerms = query.split(' ').filter(term => term.length > 0)

      return state.items.filter(item => {
        // Создаем строку для поиска из всех свойств товара
        const searchableText = [
          item.title,
          item.description,
          item.brand,
          item.category,
          `$${item.price}`,
          `${item.rating} stars`,
          `${item.stock} in stock`
        ].join(' ').toLowerCase()

        // Проверяем, содержит ли текст все поисковые термины
        return searchTerms.every(term => searchableText.includes(term))
      })
    },

    paginatedItems(state): Product[] {
      const filtered = this.filteredItems
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return filtered.slice(start, end)
    },

    totalPages(state): number {
      return Math.ceil(this.filteredItems.length / state.itemsPerPage)
    }
  },

  actions: {
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

    setViewMode(mode: ViewMode) {
      this.viewMode = mode
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.currentPage = 1 // Сброс на первую страницу при поиске
    },

    setPage(page: number) {
      this.currentPage = page
    }
  }
})

import { ref, computed } from 'vue'
import type { Product } from '~/types'
import type { Ref } from 'vue'

export const useSearch = (items: Ref<Product[]>) => {
  const searchQuery = ref('')
  
  const filteredItems = computed(() => {
    console.log('useSearch - computing filteredItems:', {
      itemsLength: items.value?.length,
      searchQuery: searchQuery.value
    })

    if (!items.value?.length) return []
    if (!searchQuery.value.trim()) return items.value
    
    const query = searchQuery.value.toLowerCase().trim()
    const searchTerms = query.split(' ').filter(term => term.length > 0)
    
    const filtered = items.value.filter(item => {
      const searchableText = [
        item.title,
        item.description,
        item.brand,
        item.category,
        `$${item.price}`,
        `${item.rating} stars`,
        `${item.stock} in stock`
      ].join(' ').toLowerCase()
      
      return searchTerms.every(term => searchableText.includes(term))
    })

    console.log('useSearch - filtered results:', {
      query,
      terms: searchTerms,
      resultsLength: filtered.length
    })

    return filtered
  })
  
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }
  
  return {
    searchQuery,
    filteredItems,
    setSearchQuery
  }
}

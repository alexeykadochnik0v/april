import { computed, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'

export const usePagination = <T>(items: ComputedRef<T[]>, itemsPerPage: number) => {
  const currentPage = ref(1)
  
  // Сбрасываем страницу при изменении items
  watch(() => items.value?.length ?? 0, () => {
    currentPage.value = 1
  })
  
  const totalPages = computed(() => {
    const length = items.value?.length ?? 0
    console.log('usePagination - computing totalPages:', {
      itemsLength: length,
      itemsPerPage
    })

    if (!length) return 1
    return Math.ceil(length / itemsPerPage)
  })
  
  const paginatedItems = computed(() => {
    const length = items.value?.length ?? 0
    console.log('usePagination - computing paginatedItems:', {
      itemsLength: length,
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      itemsPerPage
    })

    if (!length) return []
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    const result = items.value.slice(start, end)

    console.log('usePagination - paginated result:', {
      start,
      end,
      resultLength: result.length
    })

    return result
  })
  
  const setPage = (page: number) => {
    console.log('usePagination - setPage:', { page, currentTotalPages: totalPages.value })
    if (page < 1) page = 1
    if (page > totalPages.value) page = totalPages.value
    currentPage.value = page
  }
  
  const nextPage = () => setPage(currentPage.value + 1)
  const prevPage = () => setPage(currentPage.value - 1)
  
  return {
    currentPage,
    totalPages,
    paginatedItems,
    setPage,
    nextPage,
    prevPage
  }
}

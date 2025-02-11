/**
 * Composable для реализации пагинации
 * Предоставляет функционал для разбиения списка элементов на страницы
 */

import { computed, ref, watch } from 'vue'
import type { ComputedRef } from 'vue'

/**
 * @param items - Реактивный массив элементов для пагинации
 * @param itemsPerPage - Количество элементов на странице
 */
export const usePagination = <T>(items: ComputedRef<T[]>, itemsPerPage: number) => {
  // Текущая страница (начинается с 1)
  const currentPage = ref(1)
  
  // Сброс на первую страницу при изменении списка элементов
  watch(() => items.value?.length ?? 0, () => {
    currentPage.value = 1
  })
  
  // Вычисляем общее количество страниц
  const totalPages = computed(() => {
    const length = items.value?.length ?? 0
    console.log('usePagination - computing totalPages:', {
      itemsLength: length,
      itemsPerPage
    })

    if (!length) return 1
    return Math.ceil(length / itemsPerPage)
  })
  
  // Получаем элементы для текущей страницы
  const paginatedItems = computed(() => {
    const length = items.value?.length ?? 0
    console.log('usePagination - computing paginatedItems:', {
      itemsLength: length,
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      itemsPerPage
    })

    if (!length) return []
    
    // Вычисляем индексы начала и конца для текущей страницы
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
  
  /**
   * Устанавливает текущую страницу
   * Проверяет границы, чтобы страница не вышла за пределы
   */
  const setPage = (page: number) => {
    console.log('usePagination - setPage:', { page, currentTotalPages: totalPages.value })
    if (page < 1) page = 1
    if (page > totalPages.value) page = totalPages.value
    currentPage.value = page
  }
  
  // Вспомогательные методы для навигации
  const nextPage = () => setPage(currentPage.value + 1)
  const prevPage = () => setPage(currentPage.value - 1)
  
  return {
    currentPage,        // Текущая страница (ref)
    totalPages,         // Общее количество страниц (computed)
    paginatedItems,     // Элементы текущей страницы (computed)
    setPage,           // Установить страницу
    nextPage,          // Перейти на следующую страницу
    prevPage           // Перейти на предыдущую страницу
  }
}

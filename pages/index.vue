<!--
  Главная страница каталога продуктов
  Отвечает за:
  1. Отображение списка продуктов
  2. Поиск и фильтрацию
  3. Пагинацию
  4. Переключение вида (сетка/список)
-->
<template>
  <!-- Основной контейнер с максимальной шириной и отступами -->
  <div class="container">
    <h1 class="title">Product Catalog</h1>
    
    <!-- 
      Компонент поиска и переключения вида
      - v-model для двустороннего связывания поискового запроса
      - v-model:view-mode для переключения между сеткой и списком
    -->
    <SearchBar
      v-model="searchQuery"
      v-model:view-mode="viewMode"
    />
    
    <!-- 
      Компонент списка продуктов
      Пропсы:
      - products: отфильтрованные и пагинированные продукты
      - loading: состояние загрузки
      - error: ошибка, если есть
      - view-mode: текущий режим отображения (сетка/список)
      - current-page: текущая страница пагинации
      - total-pages: общее количество страниц
      - filtered-total: общее количество отфильтрованных продуктов
      
      События:
      - update:page: смена страницы
      - open-details: открытие деталей продукта
      - add-to-cart: добавление в корзину
    -->
    <ProductList
      :products="paginatedItems"
      :loading="loading"
      :error="error"
      :view-mode="viewMode"
      :current-page="currentPage"
      :total-pages="totalPages"
      :filtered-total="filteredItems.length"
      @update:page="setPage"
      @open-details="openProductDetails"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup lang="ts">
// Импорты из Vue и Nuxt
import { ref, onMounted } from "vue";
import { useHead } from "#imports";
import type { Product } from '~/types'
import type { ViewMode } from '~/types'
import { useApi } from '~/composables/useApi'
import { useSearch } from '~/composables/useSearch'
import { usePagination } from '~/composables/usePagination'
import { navigateTo } from '#app'

// SEO-оптимизация
// Устанавливаем мета-теги для поисковых систем и соцсетей
useHead({
  title: 'Tech Store | Modern Digital Shopping Experience',
  meta: [
    // Описание для поисковых систем
    {
      name: 'description',
      content: 'Discover our wide range of digital products. Browse through smartphones, laptops, accessories and more with our easy-to-use search and filtering system.'
    },
    // Ключевые слова для SEO
    {
      name: 'keywords',
      content: 'tech store, digital products, electronics, smartphones, laptops, online shopping'
    },
    // Open Graph теги для красивого отображения в соцсетях
    {
      property: 'og:title',
      content: 'Tech Store | Modern Digital Shopping Experience'
    },
    {
      property: 'og:description',
      content: 'Discover our wide range of digital products. Browse through smartphones, laptops, accessories and more.'
    }
  ]
})

// Состояние компонента
const viewMode = ref<ViewMode>('grid')    // Режим отображения (сетка/список)
const loading = ref(false)                // Индикатор загрузки
const error = ref<string | null>(null)    // Сообщение об ошибке
const items = ref<Product[]>([])          // Все продукты

// Подключаем composables
const api = useApi()                      // API для работы с продуктами
const { searchQuery, filteredItems } = useSearch(items)  // Поиск по продуктам
const { 
  currentPage,                            // Текущая страница
  totalPages,                             // Всего страниц
  paginatedItems,                         // Продукты текущей страницы
  setPage                                 // Метод смены страницы
} = usePagination(filteredItems, 9)       // 9 продуктов на странице

// Методы компонента

/**
 * Загружает список продуктов с API
 * Обрабатывает состояния загрузки и ошибки
 */
const fetchProducts = async () => {
  loading.value = true
  error.value = null
  try {
    console.log('Fetching products...')
    items.value = await api.fetchProducts()
    console.log('Products fetched:', items.value)
  } catch (err) {
    console.error('Error in fetchProducts:', err)
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}

/**
 * Открывает страницу с деталями продукта
 * @param id - ID продукта
 */
const openProductDetails = async (id: number) => {
  alert(`Clicked on product ${id}`)
}

/**
 * Добавляет продукт в корзину
 * @param product - Продукт для добавления
 */
const addToCart = (product: Product) => {
  alert(`Added ${product.title} to cart`)
}

// Жизненный цикл компонента
onMounted(() => {
  fetchProducts()  // Загружаем продукты при монтировании компонента
})
</script>

<style scoped lang="scss">
// Стили компонента
.container {
  max-width: 1280px;      // Максимальная ширина контента
  margin: 0 auto;         // Центрирование
  padding: 2rem;          // Отступы по краям
  
  @media (max-width: 768px) {
    padding: 1rem;        // Меньшие отступы на мобильных
  }
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;    // Меньший размер на мобильных
    margin-bottom: 1rem;
  }
}
</style>

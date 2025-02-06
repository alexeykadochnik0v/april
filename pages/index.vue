<template>
  <div class="container">
    <h1 class="title">Product Catalog</h1>
    <SearchBar
      v-model="searchQuery"
      v-model:view-mode="viewMode"
    />
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
import { ref, onMounted } from "vue";
import { useHead } from "#imports";
import type { Product } from '~/types'
import type { ViewMode } from '~/types'
import { useApi } from '~/composables/useApi'
import { useSearch } from '~/composables/useSearch'
import { usePagination } from '~/composables/usePagination'
import { navigateTo } from '#app'

// SEO
useHead({
  title: 'Tech Store | Modern Digital Shopping Experience',
  meta: [
    {
      name: 'description',
      content: 'Discover our wide range of digital products. Browse through smartphones, laptops, accessories and more with our easy-to-use search and filtering system.'
    },
    {
      name: 'keywords',
      content: 'tech store, digital products, electronics, smartphones, laptops, online shopping'
    },
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

// Состояние
const viewMode = ref<ViewMode>('grid')
const loading = ref(false)
const error = ref<string | null>(null)
const items = ref<Product[]>([])

// Composables
const api = useApi()
const { searchQuery, filteredItems } = useSearch(items)
const { currentPage, totalPages, paginatedItems, setPage } = usePagination(filteredItems, 9)

// Методы
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

const openProductDetails = async (id: number) => {
  alert(`Clicked on product ${id}`)
}

const addToCart = (product: Product) => {
  alert(`Added ${product.title} to cart`)
}

// Жизненный цикл
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped lang="scss">
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #f8f9fa;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
}
</style>

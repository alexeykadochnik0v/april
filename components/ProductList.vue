<template>
  <div class="product-list">
    <div v-if="loading" class="product-list__loading">
      <div class="loader"></div>
      Loading products...
    </div>
    
    <div v-else-if="error" class="product-list__error">
      {{ error }}
    </div>
    
    <div v-else>
      <div :class="['grid', `grid--${viewMode}`]">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :is-list="viewMode === 'list'"
          @open-details="openDetails"
          @add-to-cart="addToCart"
        />
      </div>
      
      <div v-if="products.length === 0" class="product-list__empty">
        No products found.
      </div>
      
      <div v-if="products.length > 0" class="product-list__pagination">
        <div class="product-list__info">
          Showing {{ (currentPage - 1) * 9 + 1 }}-{{ Math.min(currentPage * 9, filteredTotal) }} of {{ filteredTotal }} items
        </div>
        
        <div class="product-list__controls">
          <button
            class="btn"
            :disabled="currentPage === 1"
            @click="$emit('update:page', currentPage - 1)"
          >
            Previous
          </button>
          
          <span class="product-list__pagination-info">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          
          <button
            class="btn"
            :disabled="currentPage === totalPages"
            @click="$emit('update:page', currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '~/types'
import { watch } from 'vue'

interface Props {
  products: Product[]
  loading?: boolean
  error?: string | null
  viewMode: 'grid' | 'list'
  currentPage: number
  totalPages: number
  filteredTotal?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  filteredTotal: 0
})

// Добавляем отладочный вотчер
watch(() => props.products, (newProducts) => {
  console.log('ProductList - products changed:', {
    length: newProducts.length,
    loading: props.loading,
    error: props.error,
    viewMode: props.viewMode,
    currentPage: props.currentPage,
    totalPages: props.totalPages,
    filteredTotal: props.filteredTotal
  })
}, { immediate: true })

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'open-details', id: number): void
  (e: 'add-to-cart', product: Product): void
}>()

const openDetails = (id: number) => {
  emit('open-details', id)
}

const addToCart = (product: Product) => {
  emit('add-to-cart', product)
}
</script>

<style scoped lang="scss">
.product-list {
  &__loading,
  &__error,
  &__empty {
    text-align: center;
    padding: 3rem;
    color: #6c757d;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &__loading {
    .loader {
      display: inline-block;
      width: 48px;
      height: 48px;
      border: 3px solid #e9ecef;
      border-radius: 50%;
      border-top-color: #3498db;
      animation: spin 1s linear infinite;
      margin-bottom: 1.5rem;
    }
  }
  
  &__error {
    color: #e74c3c;
    border: 1px solid rgba(231, 76, 60, 0.2);
    background: rgba(231, 76, 60, 0.05);
  }
  
  &__empty {
    font-size: 1.1rem;
    color: #6c757d;
  }
  
  &__pagination {
    margin-top: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      padding: 1rem 2rem;
    }
  }
  
  &__info {
    color: #6c757d;
    font-size: 0.95rem;
    
    @media (max-width: 768px) {
      text-align: center;
    }
  }
  
  &__controls {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    
    @media (max-width: 480px) {
      flex-direction: column;
      width: 100%;
    }
    
    .btn {
      padding: 0.625rem 1.25rem;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      background: white;
      color: #6c757d;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 100px;
      
      @media (max-width: 480px) {
        width: 100%;
        text-align: center;
      }
      
      &:hover:not(:disabled) {
        border-color: #3498db;
        color: #3498db;
        background: rgba(52, 152, 219, 0.05);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: #f8f9fa;
      }
    }
  }
  
  &__pagination-info {
    color: #2c3e50;
    font-weight: 500;
    padding: 0.625rem 1rem;
    background: #f8f9fa;
    border-radius: 8px;
    min-width: 120px;
    text-align: center;
    
    @media (max-width: 480px) {
      width: 100%;
    }
  }
}

.grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
  
  &--list {
    grid-template-columns: 1fr;
    gap: 1rem;
    
    @media (max-width: 768px) {
      gap: 0.75rem;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

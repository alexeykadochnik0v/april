<template>
  <div class="search-bar">
    <div class="search-bar__container">
      <div class="search-bar__input-wrapper">
        <i class="search-icon">🔍</i>
        <input
          type="text"
          :value="modelValue"
          @input="updateValue"
          placeholder="Search by name, brand, category..."
          class="search-bar__input"
        >
        <button 
          v-if="modelValue"
          @click="$emit('update:modelValue', '')"
          class="search-bar__clear"
          title="Clear search"
        >
          ✕
        </button>
      </div>
      <div class="search-bar__view-mode">
        <button
          :class="['btn', { 'btn--active': viewMode === 'grid' }]"
          @click="$emit('update:viewMode', 'grid')"
          title="Grid view"
        >
          <i class="icon">▤</i>
        </button>
        <button
          :class="['btn', { 'btn--active': viewMode === 'list' }]"
          @click="$emit('update:viewMode', 'list')"
          title="List view"
        >
          <i class="icon">☰</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ViewMode } from '~/types'

interface Props {
  modelValue: string
  viewMode: ViewMode
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:viewMode', value: ViewMode): void
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped lang="scss">
.search-bar {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  &__container {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    @media (max-width: 640px) {
      flex-direction: column;
    }
  }
  
  &__input-wrapper {
    position: relative;
    flex-grow: 1;
    
    @media (max-width: 640px) {
      width: 100%;
    }
    
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
      width: 20px;
      height: 20px;
    }
  }
  
  &__input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    color: #2c3e50;
    transition: all 0.3s ease;
    background: #f8f9fa;
    
    &:focus {
      outline: none;
      border-color: #3498db;
      background: white;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
    }
    
    &::placeholder {
      color: #adb5bd;
    }
  }

  &__clear {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #adb5bd;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:hover {
      background: #e9ecef;
      color: #2c3e50;
    }
  }
  
  &__view-mode {
    display: flex;
    gap: 0.5rem;
    
    @media (max-width: 640px) {
      width: 100%;
    }
    
    .btn {
      padding: 0.75rem 1.25rem;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      background: white;
      color: #6c757d;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      @media (max-width: 640px) {
        flex: 1;
        justify-content: center;
      }
      
      .icon {
        width: 18px;
        height: 18px;
      }
      
      &--active {
        background: #3498db;
        border-color: #3498db;
        color: white;
        
        &:hover {
          background: #2980b9;
        }
      }
      
      &:hover:not(.btn--active) {
        border-color: #3498db;
        color: #3498db;
        background: rgba(52, 152, 219, 0.05);
      }
    }
  }
}
</style>

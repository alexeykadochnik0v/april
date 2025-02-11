<!-- 
  SearchBar.vue - Компонент поисковой строки с переключателем вида отображения
  Поддерживает:
  - Поиск по тексту с мгновенным обновлением
  - Переключение между режимами отображения (сетка/список)
  - Адаптивный дизайн
  - Очистку поискового запроса
-->
<template>
  <div class="search-bar">
    <div class="search-bar__container">
      <!-- Блок поискового ввода -->
      <div class="search-bar__input-wrapper">
        <!-- Иконка поиска -->
        <i class="search-icon">🔍</i>
        
        <!-- Поле ввода с двусторонней привязкой -->
        <input
          type="text"
          :value="modelValue"
          @input="updateValue"
          placeholder="Search by name, brand, category..."
          class="search-bar__input"
        >
        
        <!-- Кнопка очистки поиска (показывается только при наличии текста) -->
        <button 
          v-if="modelValue"
          @click="$emit('update:modelValue', '')"
          class="search-bar__clear"
          title="Clear search"
        >
          ✕
        </button>
      </div>

      <!-- Переключатель режима отображения -->
      <div class="search-bar__view-mode">
        <!-- Кнопка режима сетки -->
        <button
          :class="['btn', { 'btn--active': viewMode === 'grid' }]"
          @click="$emit('update:viewMode', 'grid')"
          title="Grid view"
        >
          <i class="icon">▤</i>
        </button>
        
        <!-- Кнопка режима списка -->
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
// Импортируем тип для режима отображения
import type { ViewMode } from '~/types'

// Определяем входные параметры компонента
interface Props {
  modelValue: string    // Текущее значение поискового запроса
  viewMode: ViewMode    // Текущий режим отображения (grid/list)
}

// Определяем props
const props = defineProps<Props>()

// Определяем события компонента
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void    // Событие изменения поискового запроса
  (e: 'update:viewMode', value: ViewMode): void    // Событие изменения режима отображения
}>()

// Обработчик изменения значения в поле ввода
const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped lang="scss">
// Основные стили компонента
.search-bar {
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  
  // Адаптация для планшетов и мобильных
  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  // Контейнер для флекс-разметки
  &__container {
    display: flex;
    gap: 1rem;
    align-items: center;
    
    // Вертикальное расположение на мобильных
    @media (max-width: 640px) {
      flex-direction: column;
    }
  }
  
  // Обертка поля ввода
  &__input-wrapper {
    position: relative;
    flex-grow: 1;
    
    @media (max-width: 640px) {
      width: 100%;
    }
    
    // Стили иконки поиска
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
  
  // Стили поля ввода
  &__input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    font-size: 1rem;
    color: #2c3e50;
    transition: all 0.3s ease;
    background: #f8f9fa;
    
    // Состояние фокуса
    &:focus {
      outline: none;
      border-color: #3498db;
      background: white;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
    }
    
    // Стиль плейсхолдера
    &::placeholder {
      color: #adb5bd;
    }
  }

  // Кнопка очистки поиска
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

    // Эффект при наведении
    &:hover {
      background: #e9ecef;
      color: #2c3e50;
    }
  }
  
  // Блок переключателя режима отображения
  &__view-mode {
    display: flex;
    gap: 0.5rem;
    
    @media (max-width: 640px) {
      width: 100%;
    }
    
    // Стили кнопок
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
      
      // Стили активной кнопки
      &--active {
        background: #3498db;
        border-color: #3498db;
        color: white;
        
        &:hover {
          background: #2980b9;
        }
      }
      
      // Эффект при наведении на неактивную кнопку
      &:hover:not(.btn--active) {
        border-color: #3498db;
        color: #3498db;
        background: rgba(52, 152, 219, 0.05);
      }
    }
  }
}
</style>

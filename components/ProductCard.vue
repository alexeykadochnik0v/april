<template>
  <div :class="['card', { 'card--list': isList }]" @click="openDetails">
    <div class="card__image">
      <img :src="product.image" :alt="product.title">
    </div>
    <div class="card__content">
      <h3 class="card__title">{{ product.title }}</h3>
      <div class="card__meta">
        <span class="card__brand">{{ product.brand }}</span>
        <span class="card__category">{{ product.category }}</span>
      </div>
      <p class="card__description">{{ truncatedDescription }}</p>
      <div class="card__details">
        <div class="card__rating">
          <span class="card__rating-value">★ {{ product.rating.toFixed(1) }}</span>
        </div>
        <span class="card__stock" :class="{ 'card__stock--low': product.stock < 10 }">
          {{ product.stock }} in stock
        </span>
      </div>
      <div class="card__footer">
        <span class="card__price">{{ formatPrice(product.price) }}</span>
        <button class="btn btn--secondary" @click.stop="addToCart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  brand: string
  category: string
  rating: number
  stock: number
}

interface Props {
  product: Product
  isList?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'open-details', id: number): void
  (e: 'add-to-cart', product: Product): void
}>()

const truncatedDescription = computed(() => {
  const maxLength = props.isList ? 150 : 100
  return props.product.description.length > maxLength
    ? `${props.product.description.slice(0, maxLength)}...`
    : props.product.description
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

const openDetails = () => {
  emit('open-details', props.product.id)
}

const addToCart = () => {
  emit('add-to-cart', props.product)
}
</script>

<style scoped lang="scss">
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &--list {
    flex-direction: row;
    height: auto;
    min-height: 200px;
    
    // Десктоп (больше 1024px)
    @media (min-width: 1025px) {
      .card__image {
        width: 300px;
        min-height: 200px;
        
        img {
          object-position: center;
        }
      }
      
      .card__content {
        width: calc(100% - 300px);
        padding: 1.5rem;
      }
      
      .card__title {
        font-size: 1.35rem;
      }
      
      .card__description {
        font-size: 1rem;
        -webkit-line-clamp: 3;
        margin: 0.75rem 0;
      }
      
      .card__meta {
        margin: 0.75rem 0;
      }
      
      .card__price {
        font-size: 1.5rem;
      }
    }
    
    // Планшет (768px - 1024px)
    @media (min-width: 768px) and (max-width: 1024px) {
      .card__image {
        width: 240px;
        min-height: 200px;
      }
      
      .card__content {
        width: calc(100% - 240px);
        padding: 1.25rem;
      }
      
      .card__description {
        -webkit-line-clamp: 3;
        margin: 0.75rem 0;
      }
    }
    
    // Мобильный (меньше 768px)
    @media (max-width: 767px) {
      flex-direction: row;
      min-height: 120px;
      padding: 0.75rem;
      gap: 1rem;
      
      .card__image {
        width: 100px;
        height: 100px;
        min-height: auto;
        border-radius: 8px;
        padding-top: 0;
      }
      
      .card__content {
        width: calc(100% - 116px);
        padding: 0;
      }
      
      .card__title {
        font-size: 1rem;
        margin-bottom: 0.25rem;
      }
      
      .card__meta {
        margin: 0;
        gap: 0.5rem;
        
        .card__brand,
        .card__category {
          font-size: 0.75rem;
          padding: 0.125rem 0.5rem;
        }
      }
      
      .card__description {
        display: none;
      }
      
      .card__details {
        margin-top: 0.5rem;
        padding-top: 0.5rem;
        gap: 0.5rem;
      }
      
      .card__rating {
        font-size: 0.875rem;
      }
      
      .card__stock {
        font-size: 0.75rem;
      }
      
      .card__footer {
        margin-top: 0.5rem;
        padding-top: 0.5rem;
      }
      
      .card__price {
        font-size: 1.125rem;
      }
      
      .btn {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }
    }
    
    .card__image {
      flex-shrink: 0;
      padding-top: 0;
      position: relative;
      background: #f8f9fa;
      overflow: hidden;
      
      img {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .card__content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 0.5rem;
    }
    
    .card__details {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid #e9ecef;
    }
  }
  
  &__image {
    position: relative;
    padding-top: 75%;
    background: #f8f9fa;
    overflow: hidden;
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  &__content {
    padding: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
    line-height: 1.4;
  }
  
  &__meta {
    display: flex;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #6c757d;
    flex-wrap: wrap;
  }
  
  &__brand, &__category {
    background: #f8f9fa;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-weight: 500;
    white-space: nowrap;
  }
  
  &__description {
    color: #6c757d;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 0.75rem;
  }
  
  &__rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    &-value {
      color: #f39c12;
      font-weight: 600;
    }
  }
  
  &__stock {
    font-size: 0.875rem;
    color: #2ecc71;
    font-weight: 500;
    
    &--low {
      color: #e74c3c;
    }
  }
  
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid #e9ecef;
  }
  
  &__price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    background: #3498db;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #2980b9;
    }
    
    &--secondary {
      background: #e9ecef;
      color: #2c3e50;
      
      &:hover {
        background: #dee2e6;
      }
    }
  }
}
</style>

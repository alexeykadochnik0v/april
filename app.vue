<!--
  app.vue - Корневой компонент приложения Nuxt
  
  Особенности:
  1. <NuxtPage /> - специальный компонент, который отображает текущую страницу
  2. Здесь определяются глобальные стили и переменные
  3. Работает как layout по умолчанию для всех страниц
-->
<template>
  <!-- 
    NuxtPage автоматически рендерит компонент из папки pages/
    в зависимости от текущего маршрута
  -->
  <NuxtPage />
</template>

<style lang="scss">
// Глобальные переменные SCSS
// -------------------------

// Цветовая схема
$primary-color: #3498db;    // Основной цвет (синий)
$secondary-color: #2ecc71;  // Дополнительный цвет (зеленый)
$text-color: #2c3e50;      // Цвет текста
$border-color: #e9ecef;    // Цвет границ
$background-color: #f8f9fa; // Цвет фона
$danger-color: #e74c3c;    // Цвет для ошибок/предупреждений

// Отступы
$spacing-xs: 0.25rem;  // 4px
$spacing-sm: 0.5rem;   // 8px
$spacing-md: 1rem;     // 16px
$spacing-lg: 1.5rem;   // 24px
$spacing-xl: 2rem;     // 32px

// Точки перелома для адаптивности
$breakpoint-sm: 480px;   // Мобильные
$breakpoint-md: 768px;   // Планшеты
$breakpoint-lg: 1024px;  // Десктопы
$breakpoint-xl: 1280px;  // Большие экраны

// Типографика
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-size-base: 1rem;      // 16px
$font-size-sm: 0.875rem;    // 14px
$font-size-lg: 1.25rem;     // 20px

// Прочие переменные
$border-radius: 8px;                      // Скругление углов
$box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // Тень
$transition-base: all 0.3s ease;          // Базовая анимация

// Глобальные стили
// ---------------

// Reset - сброс стандартных стилей
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// Базовые стили для html и body
html,
body {
  height: 100%;
  font-family: $font-family-base;
  font-size: $font-size-base;
  line-height: 1.5;
  color: $text-color;
  background: $background-color;
}

// Стили для изображений
img {
  max-width: 100%;   // Responsive images
  height: auto;
  display: block;
}

// Стили для кнопок
button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  background: none;
  padding: 0;
  
  &:disabled {
    cursor: not-allowed;
  }
}

// Утилитарные классы
// -----------------

// Контейнер для центрирования и ограничения ширины контента
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 $spacing-md;
  
  @media (max-width: $breakpoint-md) {
    padding: 0 $spacing-sm;  // Меньшие отступы на мобильных
  }
}

// Анимации
// --------

// Появление
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Появление снизу
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

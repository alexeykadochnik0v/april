<template>
  <NuxtPage />
</template>

<style lang="scss">
// Colors
$primary-color: #3498db;
$secondary-color: #2ecc71;
$text-color: #2c3e50;
$border-color: #e9ecef;
$background-color: #f8f9fa;
$danger-color: #e74c3c;

// Spacing
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;

// Breakpoints
$breakpoint-sm: 480px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;

// Typography
$font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-size-base: 1rem;
$font-size-sm: 0.875rem;
$font-size-lg: 1.25rem;

// Other
$border-radius: 8px;
$box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$transition-base: all 0.3s ease;

// Reset & Base styles
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  font-family: $font-family-base;
  font-size: $font-size-base;
  line-height: 1.5;
  color: $text-color;
  background: $background-color;
}

// Global styles
img {
  max-width: 100%;
  height: auto;
  display: block;
}

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

// Utility classes
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 $spacing-md;
  
  @media (max-width: $breakpoint-md) {
    padding: 0 $spacing-sm;
  }
}

// Animations
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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

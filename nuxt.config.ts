/**
 * Конфигурация Nuxt.js
 * Этот файл определяет основные настройки приложения
 * Документация: https://nuxt.com/docs/api/configuration/nuxt-config
 */

export default defineNuxtConfig({
  /**
   * Включаем DevTools для разработки
   * Предоставляет удобный интерфейс для отладки
   */
  devtools: { enabled: true },

  /**
   * Подключаемые модули
   * - @pinia/nuxt: Управление состоянием приложения
   * - @vueuse/nuxt: Коллекция утилит для Vue
   */
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  /**
   * Настройки приложения
   */
  app: {
    /**
     * Базовый URL приложения
     * - В продакшене: /april/ (для GitHub Pages)
     * - В разработке: / (локальный сервер)
     */
    baseURL: process.env.NODE_ENV === 'production' ? '/april/' : '/',

    /**
     * Директория для собранных ассетов (css, js, изображения)
     */
    buildAssetsDir: 'assets',

    /**
     * Мета-теги для SEO и отображения
     */
    head: {
      charset: 'utf-8',
      viewport: 'width-device-width, initial-scale=1',
      title: 'Product Catalog',
      meta: [
        { 
          name: 'description', 
          content: 'Modern product catalog built with Nuxt 3'
        }
      ]
    }
  },

  /**
   * Настройки серверного движка Nitro
   * В продакшене используем пресет для GitHub Pages
   */
  nitro: {
    preset: process.env.NODE_ENV === 'production' ? 'github_pages' : undefined
  },

  /**
   * Конфигурация времени выполнения
   * Доступна как на сервере, так и на клиенте
   */
  runtimeConfig: {
    public: {
      apiBase: 'https://dummyjson.com'  // URL API для продуктов
    }
  },

  /**
   * Дата совместимости для Nuxt
   * Помогает обеспечить стабильность при обновлениях
   */
  compatibilityDate: '2025-02-06'
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Product Catalog',
      meta: [
        { name: 'description', content: 'Modern product catalog built with Nuxt 3' }
      ]
    }
  },

  compatibilityDate: '2025-02-06'
})
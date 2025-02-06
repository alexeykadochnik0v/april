// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Отключаем SSR для разработки
  ssr: false,

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Tech Store | Modern Digital Shopping Experience',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Discover the latest in digital technology. Shop smartphones, laptops, accessories and more.'
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    baseURL: '/nuxt3-product-catalog/', 
    buildAssetsDir: 'assets'
  },

  typescript: {
    strict: false,
    typeCheck: false
  },

  vite: {
    optimizeDeps: {
      force: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/_variables.scss";
          `
        }
      }
    },
    server: {
      hmr: {
        protocol: 'ws',
        overlay: false
      }
    },
    clearScreen: false
  },

  nitro: {
    preset: 'github_pages',
    compressPublicAssets: true,
    routeRules: {
      '/**': { cors: true }
    }
  },

  css: [
    '@/assets/styles/main.scss'
  ],

  runtimeConfig: {
    public: {
      apiBase: 'https://dummyjson.com'
    }
  },

  compatibilityDate: '2025-02-06'
})
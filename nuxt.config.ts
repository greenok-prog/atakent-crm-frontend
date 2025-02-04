export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr:true,
  modules: ['nuxt-svgo', '@primevue/nuxt-module', '@vee-validate/nuxt', "@nuxt/image", '@pinia/nuxt', '@nuxt/ui'],

  svgo: {
    defaultImport: 'component',
  },

  css: ['@/assets/scss/main.scss', '~/assets/css/main.css', 'primeicons/primeicons.css'],

  runtimeConfig:{
    public:{
      baseUrl: process.env.BASE_URL,
      countryKey:process.env.COUNTRY_API_KEY
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },  
  },

  primevue:{
    importTheme:{from:'~/presets/noirPreset.ts'}
  },

  vite: {
    
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/scss/variables/index.scss";',
            },
        },
    },
},

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  compatibilityDate: '2025-01-24',
})
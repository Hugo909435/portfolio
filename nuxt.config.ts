// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  experimental: {
    appManifest: false
  },
  app: {
    head: {
      title: 'Hugo Beignon — Portfolio',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/img/logos/transparent-logo.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  modules: ['@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],
  googleFonts: {
    families: {
      'Instrument Serif': {
        ital: [400]
      },
      Inter: [400, 500],
      'JetBrains Mono': [400, 500]
    }
  }
})

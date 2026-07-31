// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'MšeOnline.cz | Přehled vysílaných katolických bohoslužeb',
      meta: [
        {
          name: 'description',
          content: 'Mše svaté online — přehled živě vysílaných katolických bohoslužeb. Odkazy na mše svaté vysílané online přehledně na jednom místě.'
        },
        { name: 'theme-color', content: '#5c6190' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/img/safari-pinned-tab.svg', color: '#5bbad5' }
      ]
    }
  },
  runtimeConfig: {
    googleCalendarId: '',
    googleServiceAccountEmail: '',
    googleServiceAccountPrivateKey: ''
  }
})

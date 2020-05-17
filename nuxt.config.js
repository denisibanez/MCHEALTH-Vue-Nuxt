
export default {
  server: {
    // port: 8000, // default: 3000
    host: '192.168.15.25' // default: localhost
  },
  mode: 'universal',
  /*
  ** Global Variables
  */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    headTitleBase: 'Estadão Saúde&Ciência',
    headTitleDivi: ' | ',
    headTitleSlog: 'Um novo olhar da informação',
    headDescr: 'Por que ainda existem pessoas que são contra as vacinas?',
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'Estadão Saúde&Ciência | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'msapplicationtilecolor', name: 'msapplication-TileColor', content: '#1B1E21' },
      { hid: 'msapplicationtileimage', name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
      { hid: 'themecolor', name: 'theme-color', content: '#1B1E21' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { 
    color: '#ea9b1c', 
    throttle: 0,
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: `~plugins/vimeo-player`, ssr: false }
    { src: `~plugins/youtube.js`, ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: [
    ],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    transpile: [
      "gsap",
      "three"
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

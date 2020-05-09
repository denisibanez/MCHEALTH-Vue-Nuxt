export default {
  mode: 'universal',
  /*
  ** Headers of the page
  
  */
  head: {
    title: process.env.npm_package_name || '',
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
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@plugins/vue-maps.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@aceforth/nuxt-optimized-images',
  ],
  optimizedImages: {
    optimizeImages: true
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-lazy-load',
    [
      "nuxt-compress",
      {
        gzip: {
          cache: true
        },
        brotli: {
          threshold: 10240
        }
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    sourceMap: false,
    layouts: false,
    pages: true,
    commons: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        },
        minSize: 51200,
        maxSize: 51200,
      }
    },
    vendor: [
      'three',
      'bootstrap',
      'gsap',
      'jquery'
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
      "three",
      "vue2-google-maps"
    ],
    filenames:{
      app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].js',
      css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.optimization.splitChunks.maxSize = 51200;
      }

      const imagemin = require('imagemin');
      const imageminPngquant = require('imagemin-pngquant');
      
      (async () => {
          await imagemin(['images/*.png'], 'build/images', {
              plugins: [
                  imageminPngquant()
              ]
          });
      
          console.log('Images optimized');
      })();
    }
  }
}

import Vue from 'vue'
import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAFFJmggC6dSyHKBfswuA6dZ_pRQ62K2vY',
    libraries: 'places'
  },
  installComponents: true
})

Vue.component('google-map', VueGoogleMaps.Map);


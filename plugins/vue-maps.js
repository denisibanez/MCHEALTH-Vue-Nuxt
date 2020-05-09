import Vue from 'vue'
import * as VueGoogleMaps from '@/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
  },
  installComponents: true
})

Vue.component('google-map', VueGoogleMaps.Map);


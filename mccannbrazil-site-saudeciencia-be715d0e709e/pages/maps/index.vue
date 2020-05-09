<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <GmapMap
          ref="gmap"
          :center="getCenter()"
          :zoom="11"
          style="height: 500px;margin: 0px -8px;"
          class="no-padding"
          :options="getOptions()"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in getMarkers()"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            :title="m.title"
            :icon="m.icon"
            @click="clicked()"
          />
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_API_TOKEN',
  },
  installComponents: true
})

export default {
  name: 'maps',

  methods: {   
    getOptions() {
      return {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      };
    },
    clicked() {
     // after click
    },
    getCenter() {     
      return {
        lat: 37.12523,
        lng: -122.1252
      };
    },
    getMarkers() {
      // generating markers for site map
      var markers = [];
      // remove this after lat long received from api.
      const tempLatLong = [
        { lat: 37.9068361, lng: -122.116971 },
        { lat: 37.9168362, lng: -122.076972 },
        { lat: 37.9268363, lng: -122.136973 },
        { lat: 37.9368364, lng: -122.146974 },
        { lat: 37.9468365, lng: -122.106975 },
        { lat: 37.9568366, lng: -122.166976 },
        { lat: 37.9668367, lng: -122.176977 },
        { lat: 37.9768368, lng: -122.016978 },
        { lat: 37.9868369, lng: -122.196979 }
      ];
      for(let i=0;i<tempLatLong.length;i++){
        markers.push({
            position: tempLatLong[i],
            title: 'test title',
            icon: this.getSiteIcon(1)    // if you want to show different as per the condition.         
          });
      }
      return markers;      
    },
    getSiteIcon(status) {
      try {
        switch (status) {
          case 1:
            return require("@/assets/images/icons/map-marker-online.svg");
            break;
          case 2:
            return require("@/assets/images/icons/map-marker-critical.svg");
            break;
          case 3:
            return require("@/assets/images/icons/map-marker-offline.svg");
            break;
          case 4:
            return require("@/assets/images/icons/map-marker-lifesafety.svg");
            break;
          default:
            return require("@/assets/images/icons/map-marker-online.svg");
        }
      } catch (e) {
        return null;
      }
    },
  },
}
</script>

<style lang="scss">

</style>
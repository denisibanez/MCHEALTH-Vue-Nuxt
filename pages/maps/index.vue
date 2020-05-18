<template>
  <div class="container-fluid maps-wrapper">
    <div class="row">
      <div class="col-md-12">
        <div id="autocompleteInput" class="d-flex nowrap justify-content-center">
          <gmap-autocomplete
            @place_changed="setPlace"
            :options="autoCompleteOptions"
            :placeholder="'Digite seu endereço completo'">
          </gmap-autocomplete>
          <button
            class="autocompleteButton"
            :disabled="!currentObj"
            @click="getMarkersClose">
              Buscar
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <google-map
          ref="gmap"
          :center="center"
          :zoom="11"
          style="height: 500px;margin: 0px -8px;"
          class="no-padding"
          :options="getOptions"
        >
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen=false">
              <div style="width: 200px; padding: 15px;">
                <p class="title">
                  {{ infoContent.title }}
                </p>
                <div
                  v-html="infoContent.address">
                </div>
                <p>
                  <a
                    :href="infoContent.urlMaps">
                      Acesse no Google  
                  </a>
                </p>
              </div>
            </gmap-info-window>

            <GmapMarker
              :key="index"
              v-for="(m, index) in places"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              :title="m.title"
              :icon="m.icon"
              @click="toggleInfoWindow(m, index)"
            />
        </google-map>
      </div>
    </div>
  </div>
</template>

<script>
import LocationService from '@/services/maps-service.js'

export default {
  name: 'maps',

  data() {
    return {
      baseHost: process.env.VUE_BASE_HOST,
      currentObj: null,
      compareItem: { position: { lat: 0 } },
      currentPlace: {
        fullAddress: null,
        coords: {
          lat: 0,
          lng: 0
        }
      },
      responsePlaces: [],
      places: [],
      oldValue: null,
      center: { 
        lat: -23.533773, lng: -46.625290 
      },
      autoCompleteOptions: {
        componentRestrictions: {
          country: [
            'br',
          ],
        },
      },
      getOptions: {
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: true
      },
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
        width: 0,
        height: -35
        }
      },
    }
  },

  created() {
    this.locationService = new LocationService()
  },

  mounted() {
    this.geolocation()
  },

  methods: {
    geolocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    setPlacesArray(coords, title, icon, address) {
      this.places.push({
        position: coords,
        title: title,
        icon: icon,
        address: address
      })
    },
  
    setPlace(place) {
      this.currentObj = place
    },

    setMyLocation() {
      this.setPlacesArray(
        this.currentPlace.coords,
        'Meu Local',
        this.getSiteIcon(1),
        `<div>
          <p>
            ${this.currentPlace.fullAddress.formatted_address}
          </p>
         </div>   
        `
      )
    },

    getMarkersClose() {
      this.currentPlace.fullAddress = this.currentObj
      this.currentPlace.coords.lat =  this.currentObj.geometry.location.lat()
      this.currentPlace.coords.lng = this.currentObj.geometry.location.lng()
      const changeOriginPoint = (this.compareItem.position.lat !== this.currentPlace.coords.lat)
      
      if(changeOriginPoint) {
        this.places = []
        this.setMyLocation()
        const param = `lat=${this.currentPlace.coords.lat}&lng=${this.currentPlace.coords.lng}`
        
        this.locationService.getLocations(param).then((response) => {
          this.responsePlaces = response.data
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.getMarkers()
          this.compareItem.position.lat = this.places[0].position.lat
          if(this.places.length == 1) {
            this.center = {
              lat: this.currentPlace.coords.lat,
              lng: this.currentPlace.coords.lng
            }
          } else {
            this.getRoute()
          }
        })
      }
    },

    getMarkers() {   
      this.responsePlaces.map((item, i) => {
        this.setPlacesArray({ lat: item.lat, lng: item.lng }, item.estabelecimento, null, `
          <div>
            <p>
              ${item.logradouro} - ${item.bairro}
              <br>
              ${item.cidade}
            </p>
          </div>
        `)
      })
    },
    
    getSiteIcon(status) {
      try {
        switch (status) {
          case 1:
            // return require("@/assets/images/home-pin.png");
            break;
          case 2:
            // return require("@/assets/images/icons/map-marker-critical.svg");
            break;
          default:
            // return require("@/assets/images/icons/map-marker-online.svg");
        }
      } catch (e) {
        return null;
      }
    },

    getRoute() {
      if (this.directionsDisplay != null) {
          this.directionsDisplay.setMap(null);
          this.directionsDisplay = null;
      }
      const origin =  { lat: this.places[0].position.lat, lng: this.places[0].position.lng }
      const destiny =  { lat: this.places[1].position.lat, lng: this.places[1].position.lng }
      const _self = this
    
      this.directionsService = new google.maps.DirectionsService()
      this.directionsDisplay = new google.maps.DirectionsRenderer()
      this.directionsDisplay.setMap(this.$refs.gmap.$mapObject)
      _self.directionsService.route({
        origin:  new google.maps.LatLng(origin.lat, origin.lng),
        destination:  new google.maps.LatLng(destiny.lat, destiny.lng),
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          _self.directionsDisplay.setDirections(response)
          _self.directionsDisplay.setOptions( { suppressMarkers: true } );
        } else {
          console.log('Directions request failed due to ' + status)
        }
      })
    },

    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = {
        title: marker.title,
        urlMaps: `https://www.google.com/maps/?q=${marker.position.lat},${marker.position.lng}`,
        address: marker.address
      };

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  },
}
</script>

<style lang="scss" >
.maps-wrapper {
  padding-top:60px;
  padding-bottom: 25px;
  
  #autocompleteInput {
    margin: 0 -15px;
    height: 60px;
    z-index: 9;
    width: 100%;
    position: absolute;
    top: -30px;

    input {
      width: 60%;
      height: 60px;
      padding: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0;
      border: 0;

      &:focus {
        transition: border 1s;
        border: 2px solid #ea9b1c;
      }
    }

    .autocompleteButton {
      height: 60px;
      width: 150px;
      background-color: #ea9b1c;
      color: #0d0e0f;
      border: 0;
      text-align: center;
      line-height: 60px;
      &:disabled {
        background-color: #b3b3b3;
      }
    }
  }

  .nowrap {
    flex-wrap: nowrap;
  }

  .gm-style-iw-t{
    color: #0d0e0f;
    h3 {
      font-size: 16px;
      text-transform: uppercase;
    }
    
    p{
      color: #0d0e0f;
      font-size:12px;
      margin: 0;
      text-transform: capitalize;

      &.title {
        text-transform: uppercase;
        font-weight: bold;
        font-size:12px;
        line-height: 12px;
        margin-bottom: 5px;
      }

      a {
       font-size: 12px;
       color:#ea9b1c;
      }
    }  

    .gm-ui-hover-effect {
      img {
        width: 20px !important;
        height: 20px !important;
        margin-left: 0px !important;
        margin-top: 10px !important;
      }
    }
  }
}
</style>
<template>
  <div class="container-fluid maps-wrapper">
    <div class="row">
      <div class="col-md-12">
        <div id="autocompleteInput" class="d-flex nowrap justify-content-center">
          <gmap-autocomplete
            @place_changed="setPlace">
          </gmap-autocomplete>
          <a
            class="autocompleteButton"
            @click="getMarkers">
              Buscar
          </a>
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
          <google-map-cluster>
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen=false">
              <div class="row">
                <div class="col-md-12">
                  <h3>{{ infoContent.title }}</h3>
                  <p>
                    <a
                      :href="infoContent.urlMaps">
                       Acesse no Google  
                    </a>
                  </p>
                </div>
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
          </google-map-cluster>  
        </google-map>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maps',

  data() {
    return {
      currentPlace: null,
      places: [],
      oldValue: null,
      center: { 
        lat: -23.533773, lng: -46.625290 
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

  mounted() {
    this.geolocation()
  },

  methods: {
    geolocation() {
      // Seta centro do mapa se estiver habilitado localização no chrome
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
  
    setPlace(place) {
      this.currentPlace = place;
      this.places = []
      this.setMyLocation()
      // tratar endereço aqui
      // verificar se tem lat long
      // se não tiver montar a string de busca e imputar numero 1 e buscar de novo
      // mandar pro back end
      // com a resposta alimentar o array do mapa no data
      // this.getMarkers()
    },

    setMyLocation() {
      this.places.push({
        position:  this.currentPlace.meulocallatlong, // integrar com valor retornado do auto complete
        title: 'Home Meu Local',
        icon: this.getSiteIcon(1) // escolhe o icone especifico
      })     
    },

    getMarkers() {
      // remove this after lat long received from api.
      this.places = []
      const tempLatLong = [
        { lat: -23.5629, lng: -46.6544 },
        { lat: -23.5533, lng: -46.6597 },
        { lat: 	-23.5981, lng: -46.7201 },
        { lat: -23.5227, lng:  -46.7104 },
      ];

      tempLatLong.map((item, i) => {
        this.places.push({
          position: item,
          title: 'Posto do fim do mundo',
          icon: null         
        });
      })

      // depois da uintegração tratar só fazer route se for diferente de my locatio
      this.getRoute()
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
      console.log(marker)
      this.infoWindowPos = marker.position;
      this.infoContent = {
        title:marker.title,
        urlMaps: `https://www.google.com/maps/?q=${marker.position.lat},${marker.position.lng}`
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

<style lang="scss" scoped>
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
    }
  }

  .nowrap {
    flex-wrap: nowrap;
  }
}
</style>
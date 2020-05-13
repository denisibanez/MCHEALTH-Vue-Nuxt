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
          <GmapMarker
            :key="index"
            v-for="(m, index) in places"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            :title="m.title"
            :icon="m.icon"
            @click="clicked()"
          />
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
      }
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
      this.setMyLocation()
      // tratar endereço aqui
      // verificar se tem lat long
      // se não tiver montar a string de busca e imputar numero 1 e buscar de novo
      // mandar pro back end
      // com a resposta alimentar o array do mapa no data
      // this.getMarkers()
    },

    setMyLocation() {
      this.place.push({
        position:  this.currentPlace.meulocallatlong, // integrar com valor retornado do auto complete
        title: 'HomMeu Local',
        icon: this.getSiteIcon(1) // escolhe o icone especifico
      })     
    },

    getMarkers() {
      // remove this after lat long received from api.
      const tempLatLong = [
        { lat: -23.5629, lng: -46.6544 },
        { lat: -23.5533, lng: -46.6597 },
      ];

      tempLatLong.map((item, i) => {
        this.places.push({
          position: item,
          title: 'test title',
          icon: null         
        });
      })
      
      console.log(this.places)
      // Se for fazer tracking de rota
      // this.getRoute()
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
      this.directionsService = new google.maps.DirectionsService()
      this.directionsDisplay = new google.maps.DirectionsRenderer()
      this.directionsDisplay.setMap(this.$refs.gmap.$mapObject)
      var vm = this
      vm.directionsService.route({
        origin:  new google.maps.LatLng(-23.5666, -46.703), // Can be coord or also a search query
        destination:  new google.maps.LatLng(-23.5629, -46.6544),
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          vm.directionsDisplay.setDirections(response) // draws the polygon to the map
        } else {
          console.log('Directions request failed due to ' + status)
        }
      })
    },

    clicked() {
     // after click
    },
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
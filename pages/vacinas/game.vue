<template>
  <div class="w-100">
    <div class="container">
      <div class="row no-gutters">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <Game />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from "../../layouts/vacinas/Game";

export default {
  components: {
    Game,
  },
  data: function() {
    return {
      
    }
  },
  head () {
    return {
      title: "Estadão - Saúde&Ciência | Vacinas"
    }
  },
  methods: {

  },
  mounted: function() {
    
  },
  transition: {
    name: 'transition',
    mode: 'out-in'
  }
}
</script>

<style lang="sass">

</style>

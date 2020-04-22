<template>
  <div class="c-vacinas">
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
      threeSizes: {
        width: 1000,
        height: 562,
      },
    }
  },
  head () {
    return {
      title: "Estadão - Saúde&Ciência | Vacinas"
    }
  },
  methods: {
    updateCanvasSize: function () {
      // this.threeSizes.width = this.$refs.refThree.clientWidth;
      // this.threeSizes.height = this.$refs.refThree.clientHeight;
    }
  },
  mounted: function() {
    this.updateCanvasSize();
  },
  transition: {
    name: 'transition',
    mode: 'out-in'
  }
}
</script>

<style lang="sass">

</style>

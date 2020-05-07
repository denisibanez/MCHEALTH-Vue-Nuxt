<template>
  <div class="c-section-game">
    <div class="w-100 my-5 my-md-10">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <section class="col-md-6 col-lg-5 py-4">
            <h3 class="font-size-lg">
              COMO AS VACINAS<br>
              <span class="lay-color-orange">ELIMINAM DOENÇAS?</span> 
            </h3>
            <div class="w-100">
              <p class="lay-color-light-gray">
                As vacinas são o meio mais seguro e eficaz de proteger as pessoas contra algumas doenças infecciosas. Seu impacto na humanidade é grandioso: <span class="lay-color-orange">aumentaram a expectativa de vida da população, reduziram a mortalidade infantil e controlaram epidemias.</span>
              </p>
              <div class="w-100 p-3 p-md-4 p-lg-5 lay-bg-codgray-transp-50 rounded border lay-border-orange mt-3 mt-md-6">
                <p class="lay-color-light-gray">
                  Mas o ato de se vacinar vai muito além da prevenção individual. Quando uma pessoa se imuniza, ela protege as que ainda não estão imunizadas.
                </p>
                <h4>E se você pudesse eliminar uma doença, <span class="lay-color-orange">será que conseguiria?</span></h4>
                <p class="lay-color-light-gray m-0">
                  Jogue o minigame ao lado e veja se é capaz! 
                </p>
              </div>
            </div>
          </section>
          <div class="col-md-5 offset-md-1 col-lg-4 offset-lg-1">
            <div class="w-100" ref="refContainerGame">
              <Game />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Game from "../../layouts/vacinas/Game";

  export default {
    name: 'SectionGame',
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
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  .transition-enter-active, 
  .transition-leave-active
    transition: opacity .4s ease-out 

  .transition-enter, 
  .transition-leave-active
    opacity: 0

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)

</style>

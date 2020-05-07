<template>
  <div class="c-vacinas">
    <BannerTrendsSearches :bannerData="bannerTrendsData" />
    <SectionThreeHumanBody />
    <SectionGame />
    <SectionQuiz />
  </div>
</template>

<script>
  import BannerTrendsSearches from "../../layouts/vacinas/BannerTrendsSearches";
  import SectionThreeHumanBody from "../../layouts/vacinas/SectionThreeHumanBody";
  import SectionGame from "../../layouts/vacinas/SectionGame";
  import SectionQuiz from "../../layouts/vacinas/SectionQuiz";

  export default {
    components: {
      BannerTrendsSearches,
      SectionThreeHumanBody,
      SectionGame,
      SectionQuiz,
    },
    data: function() {
      return {
        bannerTrendsData: {
          mainTerm: "Vacinas",
          options: [ 
            {
              index: 0,
              phrase: "<b>são perigosas ao bebê</b>",
            },
            {
              index: 1,
              phrase: "<b>deixam sequelas</b>",
            },
            {
              index: 2,
              phrase: "<b>efeitos negativos</b>",
            },
            {
              index: 3,
              phrase: "onde tomar",
            },
            {
              index: 4,
              phrase: "para o que servem",
            }
          ]
        }
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

  .c-vacinas
    background-color: #1B1E21

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)

</style>

<template>
  <div class="c-vacinas">
    <SectionThreeHumanBody />
  </div>
</template>

<script>
  import SectionThreeHumanBody from "../../layouts/vacinas/sections/SectionThreeHumanBody";
  export default {
    components: {
      SectionThreeHumanBody,
    },
    data: function() {
      return {

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

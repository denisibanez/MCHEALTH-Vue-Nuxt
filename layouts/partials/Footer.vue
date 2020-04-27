<template>
  <div class="c-footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <div class="col py-3 text-center lay-color-light-gray">
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      msg: String
    },
    methods: {
      init: function () {

      }
    }, 
    created: function() {
        
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  .c-footer 
    width: 100%
    text-align: center
    position: absolute
    bottom: 0

  .c-footer .row
    height: 90px

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)
    .c-footer
      .row
        height: 80px 
        overflow: hidden
</style>

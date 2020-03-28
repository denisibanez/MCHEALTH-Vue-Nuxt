<template>
  <div class="c-header">
    <div class="container">
      <div class="row align-items-center">
        <div class="col">
          <div class="header-list-itens">
            <!--
            <div class="menu-box">
              MN
            </div>
            -->
            <div class="brand-box">
              <a class="header-logo" :style="{ backgroundImage: 'url(' + require('@/assets/images/logo-estadao-raiox-white.svg') + ')' }" >
                <span></span>
              </a>
            </div>
            <div class="phrase-box lay-color-blue font-bebasneue font-size-header-featured">
              {{ msg }}
            </div>
            <div class="end-box">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
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
  @import '~bootstrap/scss/mixins'

  .c-header 
    width: 100%
    position: relative
    z-index: 5
    .row
      height: 90px 
  .header-logo 
    display: inline-block
    width: 170px
    height: 80px
    background-position: center center
    background-size: contain
    background-repeat: no-repeat
  .header-list-itens
    display: flex
    justify-content: flex-start
    align-items: center
    .menu-box
      color: #FFF
      padding: 15px 30px 15px 0
      font-size: 30px
      cursor: pointer
    .brand-box
      margin-right: 15px
    .phrase-box
      padding-left: 15px
      padding-left: 15px
      line-height: 1.2
      border-left: 1px solid #FFFFFF
    .end-box
      justify-self: flex-end

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)
    .header-logo 
      display: inline-block
      width: 120px
      height: 50px

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)
    .c-header
      .row
        height: 80px 
</style>

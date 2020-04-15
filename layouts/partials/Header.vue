<template>
  <div class="c-header" ref="cHeader">
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
              <nuxt-link to="/" class="header-logo c-magnetic" :style="{ backgroundImage: 'url(' + require('@/assets/images/logo-estadao-saude-e-ciencia-white.svg') + ')' }" >
                <span></span>
              </nuxt-link>
            </div>
            <div class="phrase-box text-white-50 font-estadaoheadline font-size-header-featured">
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
  import gsap from "gsap";
  import TweenLite from "gsap";
  import Power4 from "gsap";

  if (process.client) {
    gsap.registerPlugin(TweenLite, Power4);
  }

  export default {
    name: 'Header',
    props: {
      msg: String
    },
    data: function() {
      return {
        initTl: null
      }
    },
    methods: {
      init: function () {

      }
    }, 
    mounted: function() {
      const { cHeader } = this.$refs;
      TweenLite.from(cHeader, .5, { autoAlpha: 0, ease: Power4.easeOut }).delay(.5)
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
    width: 260px
    height: 80px
    background-position: center center
    background-size: contain
    background-repeat: no-repeat
  .header-list-itens
    display: flex
    justify-content: center
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
      border-left: 1px solid rgba(#FFFFFF, .5)
    .end-box
      justify-self: flex-end

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)
    .header-logo 
      display: inline-block
      width: 200px
      height: 50px
      

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)
    .c-header
      .row
        height: 80px 
    .header-logo 
      width: 150px
</style>

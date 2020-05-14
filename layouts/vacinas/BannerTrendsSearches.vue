<template>
  <div id="c-bannersearches">
    <div id="c-bannersearches-inner-wrapper">
      <div id="effect-wrapper" 
      ref="refEffectWrapper"
      :style="{ '--x': x, '--y': y }">
        <span id="parallax-person"        :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/banner/person-no-eyebrow.png') + ')' }"></span>
        <span id="parallax-eyebrow-left"  ref="refEyebrowL" :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/banner/person-eyebrow-left.png') + ')' }"></span>
        <span id="parallax-eyebrow-right" ref="refEyebrowR" :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/banner/person-eyebrow-right.png') + ')' }"></span>
        <span id="parallax-search-container" ref="refSearchContainer" :style="{ transform: 'scale(' + fieldScale.scale + ')' }">
          <span id="search-field-box" class="text-dark">
            <span id="search-field" ref="refSearchField">
              <span id="search-term">
                {{ type.field }} <span v-html="getCurrentPhrase()"></span>
              </span>
            </span>
            <span id="search-options" ref="refSearchOptions">
              <span class="search-option" v-for="item in bannerData.options" :key="item.index" :class="currentOption != null && currentOption === item.index ? 'active' : ''">
                {{ bannerData.mainTerm }} <span v-html="item.phrase"></span>
              </span>
            </span>
          </span>
          <span id="search-field-btn" class="shadow" ref="refSearchBtn">
            <i class="icomoon-search"></i>
          </span>
        </span>
      </div>  
      <!--
      <div id="effect-trigger"
      ref="refEffect"
      v-on:mousemove="handleMouseMove($event)"
      v-on:mouseleave="handleMouseLeave($event)"></div>
      -->
    </div>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 offset-lg-6 col-md-6 offset-md-6 pb-5 pb-md-0 text-center text-md-left">
          <h4 class="text-white banner-font-title font-weight-normal">
            <b>POR QUE</b> AINDA<br class="d-none d-md-inline-block">
            EXISTEM <b>PESSOAS</b><br class="d-none d-md-inline-block">
            QUE SÃO CONTRA<br class="d-none d-md-inline-block">
            AS <b class="lay-color-orange">VACINAS?</b> 
          </h4>
          <p class="text-white mb-0 px-4 px-md-0">
            Existem muitas respostas para essa pergunta, o fato é que alguns dos <span class="lay-color-orange">9 principais motivos, de acordo com pesquisa realizada pelo IBOPE em 2019</span>, são razões baseadas na falta de conhecimento e inverdades disseminadas pela internet e por outros meios que impactam seriamente a vida da população, abrindo caminho até para doenças graves já erradicadas do Brasil. Visando esclarecer algumas dúvidas importantes, o Estadão produziu este especial de vacinas.
          </p>
        </div>
      </div>
    </div>
    <div id="effect-overlay">
      <span id="overlay-shadow-frame"></span>
      <span id="overlay-texture"     :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/banner/layer-texture.png') + ')' }"></span>
      <span id="overlay-shadow-bottom"></span>
    </div> 
  </div>
</template>

<script>
  import gsap from "gsap";
  import TweenLite from "gsap";
  import { TimelineLite, CSSPlugin }  from "gsap/all";

  if (process.client) {
    gsap.registerPlugin(TweenLite, TimelineLite);
  }

  export default {
    name: 'BannerTrendsSearches',
    props: {
      bannerData: Object,
    },
    data: function() {
      return {
        x: 0,
        y: 0,
        currentOption: null,
        field: '',
        fieldScale: {
          scale: 1,
          elWidth: 0,
          elHeight: 0,
        },
        type: {
          counter: 0,
          i: 0,
          field: '',
        }
      }
    },
    methods: {
      handleMouseMove: function(event, index) {
        let { refEffect } = this.$refs;

        if (refEffect) {
          this.x = event.clientX - (refEffect.getBoundingClientRect().left + Math.floor(refEffect.clientWidth / 2));
          this.y = event.clientY - (refEffect.getBoundingClientRect().top + Math.floor(refEffect.clientHeight / 2));
        }
      },
      handleMouseLeave: function(event, index) {
        this.x = 0;
        this.y = 0;
      },
      nextOption: function () {
        if(this.currentOption == null) {
          this.currentOption = 0;
        } else if (this.currentOption < (this.bannerData.options.length - 1)) {
          this.currentOption ++;
        } else {
          this.currentOption = 0;
        }
      },
      prevOption: function () {
        if(this.currentOption > 0) {
          this.currentOption --;
        } else {
          return;
        }
      },
      getCurrentPhrase: function () {
        if (this.currentOption != null) {
          return this.bannerData.options[this.currentOption].phrase;
        }
      },
      typeSearch: function(text) {
        var speed = 250;

        if (this.type.i < text.length) {
          this.type.field += text.charAt(this.type.i);
          this.type.i++;
          setTimeout(this.typeSearch.bind(null, text), speed);
        }
      },
      chooseOptions: function() {
        this.type.counter++;
        
        let speed = 1500;
        
        if (this.type.counter <= this.bannerData.options.length) {
          this.nextOption();
          
          setTimeout(this.chooseOptions, speed);
        } else {
          this.type.counter = 0
          this.currentOption = null;
          
          setTimeout(this.chooseOptions, speed);
        }
      },
      resizeSearchBox: function(event) {
        let { refEffectWrapper } = this.$refs;

        this.fieldScale.scale = Math.min(
          (refEffectWrapper.clientWidth / 100 * 24.14) / this.fieldScale.elWidth,    
          refEffectWrapper.clientHeight / this.fieldScale.elHeight
        );
      }
    },
    mounted () {
      let { 
        refEffect, 
        refSearchField, 
        refSearchOptions, 
        refSearchBtn, 
        refEyebrowL, 
        refEyebrowR, 
        refSearchContainer,
        refEffectWrapper
      } = this.$refs;

      TweenLite.to(refEffect, .5, { opacity: 1 }).delay(.5);

      this.fieldScale.elWidth = refSearchContainer.clientWidth;
      this.fieldScale.elHeight = refSearchContainer.clientHeight;

      this.resizeSearchBox();
      window.onresize = this.resizeSearchBox;

      const tl = new TimelineLite(); 
      tl.pause()
      .to(refSearchField,   .5, { scale: 1 })
      .to(refSearchBtn,     .5, { scale: 1.1, x: 0 }, "-=.5")
      .to(refSearchField,     .2, { css: { borderBottomLeftRadius: 0 } }, "+=4")
      .to(refSearchOptions, .1, { opacity: 1 }, "-=.1")
      .to(refSearchOptions, .4, { height: 'auto' }, "-=.1")

      setTimeout(() => {
        tl.play();
        
        setTimeout(this.typeSearch.bind(this, this.bannerData.mainTerm), 3000);
        setTimeout(this.chooseOptions.bind(this), 6000);
      }, 1000);
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  $base-duration: 600ms
  $base-ease: cubic-bezier(0.25, 0.46, 0.45, 0.84)

  #c-bannersearches
    width: 100%
    background-color: #020202
    background: radial-gradient(circle, rgba(37,36,36,1) 0%, rgba(2,2,2,1) 100%)
    position: relative
    overflow: hidden
    max-height: 880px
    display: flex
    justify-content: center

    #c-bannersearches-inner-wrapper
      --maxwidth: 1740px
      max-width: var(--maxwidth)
      width: 100%
      padding-bottom: 51%
      position: relative
      @media only screen and (min-width: 1740px)
        padding-bottom: 0
        height: calc((var(--maxwidth) / 100) * 51)

    .container
      position: absolute
      left: 0
      right: 0
      margin: auto
      z-index: 3
      .banner-font-title
        position: relative
        font-size: 2.5rem
        &::before 
          position: absolute
          content: " "
          width: 180px
          height: 40px
          background-color: map-get($color-config, "orange")
          top: -5px
          left: -15px
          z-index: -1

    .container,
    .row
      height: 100%

    #effect-wrapper
      --x: 0
      --y: 0
      --d: 0
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      
      [id*="parallax-"]
        transform: scale(1.025) translate(calc(var(--x) / var(--d) * 1px), calc(var(--y) / var(--d) * 1px))
        transition: opacity ($base-duration / 2) $base-ease, transform ($base-duration / 2) $base-ease
        position: absolute
        background-position: center center
        background-repeat: no-repeat
        background-size: contain

      #parallax-person
        --d: 30
        --width: 43%
        --height: calc((var(--width) / 100) * 118.16)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -38%
        bottom: -2%

      #parallax-eyebrow-left,
      #parallax-eyebrow-right
        animation-duration: 5s
        animation-iteration-count: infinite
        animation-timing-function: ease-in-out
        animation-name: floating
        animation-delay: 1000ms

      #parallax-eyebrow-left
        --d: 30
        --width: 7%
        --height: calc((var(--width) / 100) * 80.50)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -26%
        bottom: 66%

      #parallax-eyebrow-right
        --d: 30
        --width: 7%
        --height: calc((var(--width) / 100) * 62.26)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -18.5%
        bottom: 67%

      #parallax-search-container
        display: block
        --d: 30
        --width: 24%
        --width: 420px
        width: var(--width)
        left: 50%
        margin-left: -30.5%
        bottom: 39%
        height: 50px
        font-size: 20px
        transform-origin: left

        #search-field
          display: block
          width: 100%
          height: 50px
          background-color: #FFF
          padding: 10px 15px
          box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.15)
          position: relative
          z-index: 1
          border-top-left-radius: 15px 
          border-bottom-left-radius: 15px 
          border-top-right-radius: 15px 
          border-bottom-right-radius: 15px 
          transform: scale(0)
          #search-term
            border-right: 1px solid rgba(#000, .8)
            padding-right: 1px
            animation-duration: 1s
            animation-iteration-count: infinite
            animation-timing-function: ease-in-out
            animation-name: cursor-field

        #search-field-btn
          width: 50px
          height: 50px
          background-color: map-get($color-config, "blue")
          color: #FFF
          text-align: center
          line-height: 50px
          position: absolute
          top: 0
          right: -25px
          transform: scale(0)
          z-index: 2
          border-radius: 50%

        #search-options
          display: block
          width: 100%
          background-color: #FFF
          border-bottom-left-radius: 15px 
          border-bottom-right-radius: 15px 
          padding-top: 5px
          padding-bottom: 5px
          overflow: hidden
          opacity: 0
          height: 0
          .search-option
            display: block
            width: 100%
            padding: 2px 15px
            &.active
              background-color: rgba(#000, .1)

    #effect-overlay
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0

      [id*="overlay-"]
        position: absolute
        background-position: center center
        background-repeat: repeat
        background-size: contain

      #overlay-shadow-frame
        width: 100%
        height: 100%
        top: 0
        left: 0
        background: radial-gradient(circle, rgba(37,36,36,0) 0%, rgba(2,2,2,1) 100%)
        opacity: .2

      #overlay-texture
        width: 120%
        height: 120%
        top: -10%
        left: -10%
        background-size: initial

      #overlay-shadow-bottom
        width: 100%
        height: 40%
        position: absolute
        left: 0
        bottom: 0
        background: linear-gradient(0deg, rgba(27,30,33,1) 0%, rgba(22,21,21,0) 100%)
        transform: none !important
  
    #effect-trigger
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      opacity: 0

  @keyframes cursor-field 
      from
        border-right: 1px solid rgba(#000, .8)
      50%
        border-right: 1px solid rgba(#000, .8)
      51%
        border-right: none
      to
        border-right: none

  @keyframes floating 
      from
        transform: scale(1) translate(0px, 0px)
      65%
        transform: scale(1.025) translate(0px, -10px)
      to
        transform: scale(1) translate(0px, 0px)

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)
    #c-bannersearches
      .container
        .banner-font-title
          font-size: 2.1rem
  @include media-breakpoint-down(sm)
    #c-bannersearches
      padding-top: 320px
      max-height: initial
      
      #c-bannersearches-inner-wrapper
        padding-bottom: 0
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0

      .container
        position: initial
        left: initial
        right: initial
        .banner-font-title
          font-size: 2rem
          &::before 
            display: none

      #effect-wrapper
        #parallax-eyebrow-left,
        #parallax-eyebrow-right
          --width: 43px
          bottom: initial
          top: 80px

        #parallax-eyebrow-left
          margin-left: -43px

        #parallax-eyebrow-right
          margin-left: -1px
          top: 83px

        #parallax-person
          --width: 230px
          margin-left: -103px
          bottom: initial
          top: 20px
      
        #parallax-search-container
          left: 50%
          margin-left: -211px
          bottom: initial
          top: 150px
          transform: scale(.55) !important
          transform-origin: center

      #effect-trigger
        display: none

      #parallax-shadow-frame
        display: none

      #parallax-shadow-bottom
        height: 100px !important
        bottom: initial
        top: 263px
        &::before
          display: block
          position: absolute
          content: " "
          width: 100%
          height: 500px
          top: 98%
          background-color: rgb(22,21,21)

  @include media-breakpoint-down(xs)

</style>

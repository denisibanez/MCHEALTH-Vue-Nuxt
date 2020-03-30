<template>
  <div id="c-banner">
    <div id="c-banner-inner-wrapper">
      <div id="effect-wrapper" 
      :style="{ '--x': x, '--y': y }">
        <span id="parallax-cloud-1"     :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-cloud.png') + ')' }"></span>
        <span id="parallax-cloud-2"     :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-cloud.png') + ')' }"></span>
        <span id="parallax-cloud-3"     :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-cloud.png') + ')' }"></span>
        <span id="parallax-cloud-4"     :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-cloud.png') + ')' }"></span>
        <span id="parallax-phone"       :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-phone.png') + ')' }"></span>
        <span id="parallax-exclamation" :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-exclamation.png') + ')' }"></span>
        <span id="parallax-mic"         :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-mic.png') + ')' }"></span>
        <span id="parallax-likes"       :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-likes.png') + ')' }"></span>
        <span id="parallax-boy"         :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-boy.png') + ')' }"></span>
        <span id="parallax-chat"        :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-chat.png') + ')' }"></span>
        <span id="parallax-table"       :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-table.png') + ')' }"></span>
        <span id="parallax-notebook"    :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-notebook.png') + ')' }"></span>
        <span id="parallax-shadow-bottom"></span>
        <span id="parallax-shadow-frame"></span>
        <span id="parallax-texture"     :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/parallax/layer-texture.png') + ')' }"></span>
      </div>
      <div class="container">
        <div class="row align-items-center justify-content-end">
          <div class="col-md-6 pb-4 pb-md-0 text-center text-md-left">
            <h4 class="text-white font-size-xl font-bebasneue">
              POSSO ATRAPALHAR?
            </h4>
            <p class="lay-color-orange">
              Sites, grupos de mensagens, opiniões de desconhecidos, <br> 
              fake news e ignorância.
            </p>
            <p class="text-white mb-0">
              Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.
            </p>
          </div>
        </div>
      </div>
      <div id="effect-trigger"
      ref="refEffect"
      v-on:mousemove="handleMouseMove($event)"
      v-on:mouseleave="handleMouseLeave($event)"></div>
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
  name: 'Banner',
  data: function() {
    return {
      x: 0,
      y: 0,
    }
  },
  methods: {
    handleMouseMove: function(event, index) {
      let ref = this.$refs.refEffect;

      if (ref) {
        this.x = event.clientX - (ref.getBoundingClientRect().left + Math.floor(ref.clientWidth / 2));
        this.y = event.clientY - (ref.getBoundingClientRect().top + Math.floor(ref.clientHeight / 2));
      }
    },
    handleMouseLeave: function(event, index) {
      this.x = 0;
      this.y = 0;
    },
  },
  mounted () {
    let ref = this.$refs.refEffect;

    TweenLite.from(ref, .5, { y: +30, opacity: 0, ease: Power4.easeOut }).delay(.5)
  }
}
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~bootstrap/scss/mixins'

  $base-duration: 600ms
  $base-ease: cubic-bezier(0.25, 0.46, 0.45, 0.84)

  #c-banner
    width: 100%
    // height: calc(100vh - 90px)
    background-color: #020202
    background: radial-gradient(circle, rgba(37,36,36,1) 0%, rgba(2,2,2,1) 100%)
    position: relative
    overflow: hidden
    max-height: 880px

    #c-banner-inner-wrapper
      width: 100%
      padding-bottom: 51%

    .container
      position: absolute
      left: 0
      right: 0
      margin: auto

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

      [id*="parallax-cloud"]
        --width: 400px
        --height: calc((var(--width) / 100) * 50.5)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        &#parallax-cloud-1
          --d: 30
          --width: 30%
          margin-left: 30%
          top: 40%
          opacity: .07
        &#parallax-cloud-2
          --d: 40
          --width: 30%
          margin-left: 19%
          top: 10%
          opacity: .07
        &#parallax-cloud-3
          --d: 35
          --width: 30%
          margin-left: -10%
          top: 18%
          opacity: .07
        &#parallax-cloud-4
          --d: 25
          --width: 40%
          margin-left: -28%
          top: 9%

      #parallax-phone
        --d: 20
        --width: 6%
        --height: calc((var(--width) / 100) * 122.7)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -31%
        bottom: 75%

      #parallax-exclamation
        --d: 21
        --width: 2.5%
        --height: calc((var(--width) / 100) * 165.52)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -36%
        bottom: 80%

      #parallax-mic
        --d: 19
        --width: 6%
        --height: calc((var(--width) / 100) * 107.69)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -8%
        bottom: 56%

      #parallax-likes
        --d: 17
        --width: 5%
        --height: calc((var(--width) / 100) * 90.55)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -18%
        bottom: 64%

      #parallax-boy
        --d: 16
        --width: 31%
        --height: calc((var(--width) / 100) * 117.53)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -38%
        bottom: -2%

      #parallax-chat
        --d: 15
        --width: 6%
        --height: calc((var(--width) / 100) * 98.09)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -38%
        bottom: 62%

      #parallax-table
        --d: 13
        --width: 27%
        --height: calc((var(--width) / 100) * 52.82)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -28%
        bottom: -10%

      #parallax-notebook
        --d: 12
        --width: 16%
        --height: calc((var(--width) / 100) * 87.54)
        width: var(--width)
        padding-bottom: var(--height)
        left: 50%
        margin-left: -15%
        bottom: 16%

      #parallax-shadow-bottom
        width: 100%
        height: 40%
        position: absolute
        left: 0
        bottom: 0
        background: linear-gradient(0deg, rgba(22,21,21,1) 0%, rgba(22,21,21,0) 100%)

      #parallax-shadow-frame
        width: 100%
        height: 100%
        top: 0
        left: 0
        background: radial-gradient(circle, rgba(37,36,36,0) 0%, rgba(2,2,2,1) 100%)
        opacity: .5
        background-repeat: repeat

      #parallax-texture
        --d: 15
        width: 120%
        height: 120%
        top: -10%
        left: -10%
        background-size: initial
        background-repeat: repeat

    #effect-trigger
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0


  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)
    #c-banner
      padding-top: 380px

      #c-banner-inner-wrapper
        padding-bottom: 0

      .container
        position: initial
        left: initial
        right: initial

      #effect-wrapper

        @keyframes floating 
            from
              transform: scale(1) translate(0px, 0px)
            65%
              transform: scale(1.025) translate(-15px, 0)
            to
              transform: scale(1) translate(0px, 0px)

        [id*="parallax-"]
          animation-duration: 5s
          animation-iteration-count: infinite
          animation-timing-function: ease-in-out

        #parallax-cloud-4
          --width: 200px !important
          margin-left: -30px !important
          top: 45px !important
          animation-name: floating
          animation-delay: 200ms

        #parallax-phone
          --width: 43px
          margin-left: -80px
          bottom: initial
          top: 40px
          animation-name: floating
          animation-delay: 400ms

        #parallax-exclamation
          --width: 17px
          margin-left: -100px
          bottom: initial
          top: 43px
          animation-name: floating
          animation-delay: 100ms

        #parallax-mic
          --width: 43px
          margin-left: 45px
          bottom: initial
          top: 110px
          animation-name: floating
          animation-delay: 600ms

        #parallax-likes
          --width: 35px
          margin-left: 15px
          bottom: initial
          top: 90px
          animation-name: floating
          animation-delay: 800ms

        #parallax-boy
          --width: 223px
          margin-left: -130px
          bottom: initial
          top: 100px

        #parallax-chat
          --width: 43px
          margin-left: -140px
          bottom: initial
          top: 91px
          animation-name: floating
          animation-delay: 900ms

        #parallax-table
          --width: 195px
          margin-left: -50px
          bottom: initial
          top: 300px

        #parallax-notebook
          --width: 115px
          margin-left: 40px
          bottom: initial
          top: 200px
          animation-name: floating
          animation-delay: 100ms
      
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

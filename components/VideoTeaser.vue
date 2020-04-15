<template>
  <div class="c-video-teaser" ref="cVideoTeaser">
    <div class="presentation-wrapper--out" :class="trailerFocus ? 'hide' : ''">
      <div class="teaser-wrapper" 
      ref="refVimeoTeaserBox"
      :class="vimeoTeaser.loaded ? 'show' : ''"
      :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/video-teaser-poster.jpg') + ')' }"></div>
      <div class="shadow-frame">
        <div class="helper--1"></div>
        <div class="helper--2"></div>
      </div>
      <div class="overlay-content">
        <div class="container h-100">
          <div class="row h-100 align-items-center  justify-content-center justify-content-md-start">
            <div class="col-md-5 col-10 text-center text-md-left py-4" ref="refOverlay">
              <h1 class="lay-color-orange font-size-title">{{videoData.title}}</h1>
              <h2 class="font-flama font-size-subtitle font-weight-normal text-shadow-01 mb-3">{{videoData.subtitle}}</h2>
              <p class="text-white-80 text-shadow-01">{{videoData.description}}</p>
              <a href="#" 
              :title="videoData.button" 
              class="btn btn-default-transparent-button-arrow lay-color-black c-magnetic"
              v-on:click="toggleTrailer()">
                {{ videoData.button }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trailer-wrapper--out"
    ref="refTrailerWrapper">
      <div class="trailer-wrapper" 
      ref="refVimeoTrailerBox"></div>
      <div class="trailer-close-button c-magnetic is-cursor-hover" 
      v-on:click="toggleTrailer()"
      ref="refTrailerBtnClose"></div>
    </div>
  </div>
</template>

<script>
  import gsap from "gsap";
  import TweenLite from "gsap";
  import Power4 from "gsap";
  import Player from '@vimeo/player'

  if (process.client) {
    gsap.registerPlugin(TweenLite, Power4);
  }

  export default {
    name: 'VideoTeaser',
    props: {
      videoData: Object
    },
    data: function() {
      return {
        vimeoTeaser: {
          player: null,
          loaded: false,
          options: {
            url: null,
            width: null,
            height: null,
            background: true,
            controls: false,
          },
        },
        vimeoTrailer: {
          player: null,
          loaded: false,
          volume: 1,
          options: {
            url: null,
            responsive: true,
            controls: false,
          },
        },
        trailerFocus: false,
      }
    },
    methods: {
      installVimeoTeaser: function () {
        this.vimeoTeaser.player = new Player(this.$refs.refVimeoTeaserBox , this.vimeoTeaser.options);

        this.vimeoTeaser.player.on('bufferend', () => {
          this.vimeoTeaser.loaded = true;
        });
      },
      installVimeoTrailer: function () {
        this.vimeoTrailer.player = new Player(this.$refs.refVimeoTrailerBox , this.vimeoTrailer.options);

        this.vimeoTrailer.player.on('bufferend', () => {
          this.vimeoTrailer.loaded = true;
        });

        this.vimeoTrailer.player.on('ended', () => {
          this.toggleTrailer();
        });

        this.vimeoTrailer.player.setColor('#ea9b1c');
      },
      toggleTrailer: function () {
        this.trailerFocus = !this.trailerFocus;
        const { refTrailerWrapper, refTrailerBtnClose } = this.$refs;

        if (this.trailerFocus) {
          TweenLite.to(refTrailerWrapper, .3, { css: { display: 'block', opacity: 1} , ease: Power4.easeOut });
          TweenLite.to(refTrailerBtnClose, .3, { css: { scale: 1 } , ease: Power4.easeOut, delay: .3 });
          
          this.vimeoTeaser.player.pause().then(() => {
            this.vimeoTrailer.player.play().then(() => {
              this.vimeoTeaser.loaded = false;
            });          
          });

          let counter = 1;
          let loop = 5;
          let volumeSlice = this.vimeoTrailer.volume / loop;
          let myVolume = 0;
          
          let interval = setInterval(() => {
            myVolume += volumeSlice;

            if (myVolume < 0) {
              myVolume = 0;
            } else if (myVolume > 1) {
              myVolume = 1;
            }

            this.vimeoTrailer.player.setVolume(myVolume);

            if (counter == loop) {
              clearInterval(interval);
            }
            counter++;
          }, 300);
        } else {
          TweenLite.to(refTrailerWrapper, .3, { css: { opacity: 0 } , ease: Power4.easeOut });
          TweenLite.to(refTrailerBtnClose, .3, { css: { scale: 0 } , ease: Power4.easeOut });
          
          let counter = 1;
          let loop = 5;
          let volumeSlice = this.vimeoTrailer.volume / loop;
          let myVolume = this.vimeoTrailer.volume;
          
          let interval = setInterval(() => {
            myVolume -= volumeSlice;

            if (myVolume < 0) {
              myVolume = 0;
            } else if (myVolume > 1) {
              myVolume = 1;
            }

            this.vimeoTrailer.player.setVolume(myVolume);

            if (counter == loop) {
              clearInterval(interval);
              
              TweenLite.to(refTrailerWrapper, .1, { css: { display: 'none'} , ease: Power4.easeOut });
                          
              this.vimeoTrailer.player.pause().then(() => {
                this.vimeoTeaser.loaded = true;
                this.vimeoTeaser.player.play();
              });
            }
            counter++;
          }, 200);
        }
      },
    }, 
    mounted() {
      // Update Magnetic Cursor Anchors
      this.$root.$emit('updateCursorListeners');
      
      let ref = this.$refs.cVideoTeaser;

      // Teaser Settings
      this.vimeoTeaser.options.url = 'https://vimeo.com/' + this.videoData.idVideoTeaser;
      this.vimeoTeaser.options.width = ref.clientWidth;
      this.installVimeoTeaser();

      // Trailer Settings
      this.vimeoTrailer.options.url = 'https://vimeo.com/' + this.videoData.idVideoTrailer;
      this.installVimeoTrailer();

      const { refOverlay } = this.$refs;
      TweenLite.from(refOverlay, .5, { autoAlpha: 0, x: "-=30", ease: Power4.easeOut }).delay(.5);

    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~bootstrap/scss/mixins'

  .c-video-teaser
    position: absolute
    top: 0
    left: 0
    align-items: center
    display: flex
    height: 100%
    justify-content: center
    overflow: hidden
    width: 100%

    .presentation-wrapper--out
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      overflow: hidden
      z-index: 1
      background-position: center center
      background-size: cover
      transform: scale(1)
      opacity: 1
      transition: transform .5s ease-out, opacity .5s ease-out

      &.hide
        opacity: 0
        transform: scale(1.05)

      .teaser-wrapper
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        pointer-events: none
        overflow: hidden
        z-index: 1
        background-position: center center
        background-size: cover

        /deep/ iframe
          width: 100vw
          // height: 56.25vw // Given a 16:9 aspect ratio, 9/16*100 = 56.25
          height: 41.66vw // Given a 12:5 aspect ratio, 5/12*100 = 41.66
          min-height: 100vh
          // min-width: 177.77vh // Given a 16:9 aspect ratio, 16/9*100 = 177.77
          min-width: 240vh // Given a 12:5 aspect ratio, 12/5*100 = 240
          position: absolute
          pointer-events: none
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
          transition: opacity .2s ease-out
          opacity: 0

        &.show /deep/ iframe
          opacity: 1

      .shadow-frame
        display: block
        content: " "
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 2

        &::before
          opacity: .5
          position: absolute
          display: block
          content: " "
          width: 100%
          height: 100%
          top: 0
          left: 0
          background-color: #000      

        [class*="helper--"]
          position: absolute
          width: 100% 
          height: 100% 

          &::after,
          &::before
            opacity: .5
            position: absolute
            display: block
            content: " "
            width: 100%
            height: 100%
            top: 0
            left: 0

        .helper--1
          &::before
            opacity: 1
            background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)
            height: 30%
            top: 0
          &::after
            opacity: 1
            background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)
            height: 30%
            top: 70%

        .helper--2
          &::before
            opacity: 1
            background: linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)
            width: 50%
            left: 0

      .overlay-content
        z-index: 3
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0

    .trailer-wrapper--out
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      overflow: hidden
      z-index: 5
      background-color: #000000
      opacity: 0
      display: none
      transition: display .1s ease-out, opacity .5s ease-out
      /deep/ iframe 
        pointer-events: none

      .trailer-wrapper
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        /deep/ div
          position: initial !important

      .trailer-close-button
        position: absolute
        width: 50px 
        height: 50px
        border-radius: 50%
        top: 30px
        right: 30px
        background-color: rgba(108, 108, 108, 0.45)
        z-index: 6
        transform: scale(0)
        &::after,
        &::before
          display: block
          content: " "
          position: absolute
          width: 2px 
          height: 20px
          border-radius: 2px
          background-color: #FFFFFF
          top: 50%
          margin-top: -10px
          left: 50%
          margin-left: -1px
          transition: transform .2s ease-out
        &::after
          transform: rotate(45deg)
        &::before
          transform: rotate(-45deg)
        &:hover
          &::after
            transform: rotate(90deg) scale(.9)
          &::before
            transform: rotate(90deg) scale(.9)



  .font-size-title
    font-size: 140px
    line-height: 1

  .font-size-subtitle
    font-size: 40px



  @include media-breakpoint-down(lg)
    .font-size-title
      font-size: 130px

    .font-size-subtitle
      // font-size: 40px

  @include media-breakpoint-down(md)
    .font-size-title
      font-size: 120px

    .font-size-subtitle
      font-size: 35px

  @include media-breakpoint-down(sm)
    .font-size-title
      font-size: 90px

    .font-size-subtitle
      font-size: 30px

  @include media-breakpoint-down(xs)
    .font-size-title
      font-size: 60px

    .font-size-subtitle
      font-size: 25px

  #hidden-frame 
    .helper--2
      &::before
        opacity: 0
</style>

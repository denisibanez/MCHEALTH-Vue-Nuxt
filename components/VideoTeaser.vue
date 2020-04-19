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
            <div class="col-md-5 col-10 text-center text-md-left py-4 px-0 px-sm-3" id="ref-overlay" ref="refOverlay">
              <h1 class="lay-color-orange font-size-title">{{videoData.title}}</h1>
              <h2 class="font-flama font-size-subtitle font-weight-normal text-shadow-01 mb-3">{{videoData.subtitle}}</h2>
              <p class="text-white-80 text-shadow-01">{{videoData.description}}</p>
              <button 
              :title="videoData.button" 
              class="btn btn-default-transparent-button-arrow lay-color-black c-magnetic"
              v-on:click="fullScreenTrailerOpen()">
                {{ videoData.button }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="trailer-wrapper--out"
    ref="refTrailerWrapper">
      <div class="trailer-wrapper"
      :class="'videoplayer--' + vimeoTrailer.status + ' ' + 'mouse--' + vimeoTrailer.mouseStatus" 
      ref="refVimeoTrailerBox">
        <div class="videocontrol" v-on:click="toggleTrailer()">
          <button class="c-magnetic">
            <span class="container--helpers">
              <span class="helper--1"></span>
              <span class="helper--2"></span>
              <span class="helper--3"></span>
            </span>
          </button>
        </div>
      </div>
      <div class="trailer-close-button c-magnetic is-cursor-hover" 
      v-on:click="fullScreenTrailerClose()"
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
          status: 'paused',
          mouseStatus: 'stoped',
          player: null,
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
        this.vimeoTrailer.player.setColor('#ea9b1c');

        this.vimeoTrailer.player.on('ended', () => {
          this.fullScreenTrailerClose();
        });

        this.vimeoTrailer.player.on('bufferstart', () => {
          this.vimeoTrailer.status = 'loading';
        });

        this.vimeoTrailer.player.on('bufferend', () => {
          this.vimeoTrailer.status = 'played';
        });

        this.vimeoTrailer.player.on('play', () => {
          this.vimeoTrailer.status = 'played';
        });

        this.vimeoTrailer.player.on('pause', () => {
          this.vimeoTrailer.status = 'paused';
        });
      },
      fullScreenTrailerOpen: function () {
        this.trailerFocus = true;
        const { refTrailerWrapper, refTrailerBtnClose } = this.$refs;

        TweenLite.to(refTrailerWrapper, .3, { css: { display: 'block', opacity: 1} , ease: Power4.easeOut });
        TweenLite.to(refTrailerBtnClose, .3, { css: { display: 'block', scale: 1 } , ease: Power4.easeOut, delay: .3 });
        
        this.playTrailer();
      },
      fullScreenTrailerClose: function() {
        this.trailerFocus = false;
        const { refTrailerWrapper, refTrailerBtnClose } = this.$refs;

        TweenLite.to(refTrailerWrapper, .3, { css: { opacity: 0, display: 'none' } , ease: Power4.easeOut });
        TweenLite.to(refTrailerBtnClose, .3, { css: { scale: 0, display: 'none' } , ease: Power4.easeOut });
        
        this.pauseTrailer();
      },
      toggleTrailer: function () { 
        if (this.vimeoTrailer.status === 'played') {
          this.vimeoTrailer.player.pause();
        } else if (this.vimeoTrailer.status === 'paused') {
          this.vimeoTrailer.player.play();
        }
      },
      playTrailer: function () {
        this.vimeoTrailer.status = 'loading';

        this.vimeoTeaser.player.pause().then(() => {
          this.vimeoTrailer.player.play();          
        });
      },
      pauseTrailer: function () {        
        this.vimeoTeaser.loaded = false;
        this.vimeoTrailer.player.pause().then(() => {
          this.vimeoTeaser.loaded = true;
          this.vimeoTeaser.player.play();
        });
      }
    }, 
    mounted() {
      const { refOverlay } = this.$refs;
      const { refVimeoTrailerBox } = this.$refs;
      let moveTimer;
      
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

      TweenLite.to(refOverlay, .5, { autoAlpha: 1, x: 0 }).delay(.5);

      refVimeoTrailerBox.addEventListener("mouseout", () => {
        this.vimeoTrailer.mouseStatus = 'stoped';

        clearTimeout(moveTimer);
      });

      refVimeoTrailerBox.addEventListener("mousemove", () => {
        clearTimeout(moveTimer);

        moveTimer = setTimeout(() => {
          this.vimeoTrailer.mouseStatus = 'stoped';
          document.querySelector('html').classList.add('hide-cursor');
        }, 2000);

        this.vimeoTrailer.mouseStatus = 'moving';
      });
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~bootstrap/scss/mixins'

  .c-video-teaser
    top: 0
    left: 0
    height: 100%
    width: 100%
    overflow: hidden

    .presentation-wrapper--out
      position: relative
      width: 100%
      height: 100%
      top: 0
      left: 0
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
        position: relative
        width: 100%
        height: 100%
        top: 0
        left: 0
        padding-top: 90px
        overflow: scroll
        &::before
          position: fixed
          display: block
          content: " "
          opacity: 1
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)
          width: 100%
          height: 90px
          left: 0
          top: 0
          z-index: 1
        #ref-overlay
          opacity: 0
          transform: translateX(-30px)

    .trailer-wrapper--out
      position: absolute
      width: 100%
      height: 100vh
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
        /deep/ div:last-of-type
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
    line-height: .8

  .font-size-subtitle
    font-size: 40px

  [class*='videoplayer--']
    position: relative !important
    .videocontrol
      display: flex
      justify-content: center
      align-items: center
      position: absolute !important
      width: 100%
      height: 100%
      z-index: 5
      button
        position: relative
        display: block
        content: " "
        width: 15%
        padding-bottom: 15%
        border: 3px solid #FFF
        border-radius: 50% 
        background-color: transparent
        outline: 0
        transition: all .2s ease-out
        opacity: 1
        .container--helpers
          display: block
          position: absolute
          width: 100%
          height: 100%
          top: 0
          left: 0
          transform: rotate(0deg)
          transition: all .3s ease-out
          [class*='helper--']
            display: block
            width: 3px
            height: 50% 
            position: absolute
            background-color: #FFFFFF
            left: 50%
            margin-left: -1px
            top: 25%
            transition: all .2s ease-out
            border-radius: 3px
      &::focus
        box-shadow: none
        outline: 0
    &[class*='--played']
      .videocontrol
        button 
          .container--helpers
            .helper--1
              left: 40%
            .helper--2
              left: 60%
            .helper--3
              left: 60%
      &.mouse--stoped
        button 
          opacity: 0
    &[class*='--paused']
      .videocontrol
        button 
          .container--helpers
            .helper--1
              left: 30%
            .helper--2
              left: 30%
              transform-origin: top
              transform: rotate(-60deg)
            .helper--3
              left: 30%
              transform-origin: bottom
              transform: rotate(60deg)
    &[class*='--loading']
      .videocontrol
        button 
          .container--helpers
            animation: rotating 2s linear infinite
            .helper--1
              width: 20px
              height: 20px
              border-radius: 20px
              left: -11px
              top: calc(50% - 10px)
            .helper--2
              width: 20px
              height: 20px
              border-radius: 20px
              left: calc(100% - 7px)
              top: calc(50% - 10px)
              transform-origin: top
              transform: rotate(0deg)
            .helper--3
              width: 20px
              height: 20px
              border-radius: 20px
              left: -11px
              top: calc(50% - 10px)
              transform-origin: top
              transform: rotate(0deg)
              opacity: 0

  @keyframes rotating
    from
      -ms-transform: rotate(0deg)
      -moz-transform: rotate(0deg)
      -webkit-transform: rotate(0deg)
      -o-transform: rotate(0deg)
      transform: rotate(0deg)
    
    to
      -ms-transform: rotate(360deg)
      -moz-transform: rotate(360deg)
      -webkit-transform: rotate(360deg)
      -o-transform: rotate(360deg)
      transform: rotate(360deg)

  @include media-breakpoint-down(lg)
    .font-size-title
      font-size: 110px

    .font-size-subtitle
      // font-size: 40px

  @include media-breakpoint-down(md)
    .font-size-title
      font-size: 100px

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

      .overlay-content
        padding-top: 80px

    #hidden-frame 
      .helper--2
        &::before
          opacity: 0
</style>

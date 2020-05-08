<template>
  <div class="c-vimeo-player">
    <div class="video-wrapper"
    :class="'videoplayer--' + vimeo.status + ' ' + 'mouse--' + vimeo.mouseStatus" 
    ref="refVimeo">
      <div class="video-control" v-on:click="toggleVideo()">
        <button class="c-magnetic">
          <span class="container--helpers">
            <span class="helper--1"></span>
            <span class="helper--2"></span>
            <span class="helper--3"></span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Player from '@vimeo/player'

  export default {
    name: 'VimeoPlayer',
    props: {
      url: String
    },
    data: function() {
      return {
        vimeo: {
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
      }
    },
    methods: {
      installVimeo: function () {
        this.vimeo.player = new Player(this.$refs.refVimeo , this.vimeo.options);
        this.vimeo.player.setColor('#ea9b1c');

        this.vimeo.player.on('ended', () => {
          // Do something
        });
        this.vimeo.player.on('bufferstart', () => {
          this.vimeo.status = 'loading';
        });
        this.vimeo.player.on('bufferend', () => {
          this.vimeo.status = 'played';
        });
        this.vimeo.player.on('play', () => {
          this.vimeo.status = 'played';
        });
        this.vimeo.player.on('pause', () => {
          this.vimeo.status = 'paused';
        });
      },
      playVideo: function () {
        this.vimeo.status = 'loading';

        this.vimeo.player.play();
      },
      pauseVideo: function () {       
        this.vimeo.player.pause();
      },
      toggleVideo: function () { 
        if (this.vimeo.status === 'played') {
          this.pauseVideo();
        } else if (this.vimeo.status === 'paused') {
          this.playVideo();
        }
      },
    },
    mounted() {
      const { refVimeo } = this.$refs;
      let moveTimer;
      
      // Update Magnetic Cursor Anchors
      // this.$root.$emit('updateCursorListeners');
      
      // Vimeo Settings
      this.vimeo.options.url = 'https://vimeo.com/' + this.url;
      this.installVimeo();

      refVimeo.addEventListener("mouseout", () => {
        this.vimeo.mouseStatus = 'stoped';

        clearTimeout(moveTimer);
      });

      refVimeo.addEventListener("mousemove", () => {
        clearTimeout(moveTimer);

        moveTimer = setTimeout(() => {
          this.vimeo.mouseStatus = 'stoped';
          document.querySelector('html').classList.add('hide-cursor');
        }, 3000);

        this.vimeo.mouseStatus = 'moving';
      });
    },
    watch: {
      url: function() { 
        this.vimeo.options.url = 'https://vimeo.com/' + this.url;

        this.vimeo.player.loadVideo(this.url).then(function(id) {
          // the video successfully loaded
        }).catch(function(error) {
          switch (error.name) {
            case 'TypeError':
              // the id was not a number
              break;

            case 'PasswordError':
              // the video is password-protected and the viewer needs to enter the
              // password first
              break;

            case 'PrivacyError':
              // the video is password-protected or private
              break;

            default:
              // some other error occurred
              break;
          }
        });
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  .c-vimeo-player
    background-color: #000
    width: 100%
    .vimeo-wrapper
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      /deep/ div:last-of-type
        position: initial !important

    [class*='videoplayer--']
      position: relative !important
      .video-control
        display: flex
        justify-content: center
        align-items: center
        position: absolute !important
        width: 100%
        height: 100%
        z-index: 5
        button
          --radius: 50px
          position: relative
          display: block
          content: " "
          width: calc(var(--radius) * 2)
          height: calc(var(--radius) * 2)
          border-radius: 50%
          border: 0
          background-color: rgba(map-get($color-config, "darker"), .5)
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
              height: 40% 
              position: absolute
              background-color: #FFFFFF
              margin-left: -1px
              top: 30%
              transition: all .2s ease-out
              border-radius: 5px
        &::focus
          box-shadow: none
          outline: 0
      &[class*='--played']
        .video-control
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
        .video-control
          button 
            .container--helpers
              .helper--1
                left: 35%
              .helper--2
                left: 35%
                transform-origin: top
                transform: rotate(-60deg)
              .helper--3
                left: 35%
                transform-origin: bottom
                transform: rotate(60deg)
      &[class*='--loading']
        .video-control
          button 
            .container--helpers
              animation: rotating 2s linear infinite
              .helper--1,
              .helper--2,
              .helper--3
                width: 14px
                height: 14px
                border-radius: 14px

              .helper--1,
              .helper--2
                left: 35%
                margin-left: -7px
                top: 50%
                margin-top: -7px
              .helper--2
                transform: rotate(0deg)
                opacity: 0
              .helper--3
                left: 65%
                margin-left: -7px
                top: 50%
                margin-top: -7px
  
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

  @keyframes animatedBackground
    from
      background-position: 0 0
    to
      background-position: -1000px 0

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)
    
  @include media-breakpoint-down(xs)

</style>

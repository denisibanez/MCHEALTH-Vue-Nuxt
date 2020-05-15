<template>
  <div class="c-vimeo-playlist">
    <div class="w-100 box-detailed-right-top">
      <span class="detail"></span>
      <div class="content overflow-hidden rounded">
        <div class="row no-gutters">
          <div class="col-md-7 col-lg-8">
            <div class="w-100 h-100 d-flex align-items-center justify-content-center box-video">
              <!-- <VimeoPlayer :url="getCurrentVideoID()" /> -->
              <no-ssr placeholder="Carregando...">
                <youtube :video-id="getCurrentVideoID()" :player-vars="playerVars"></youtube>
              </no-ssr>
            </div>
          </div>
          <div class="col-md-5 col-lg-4 p-4">
            <div class="w-100 h-100 tv-sidebar">
              <div class="tv-sidebar-title">
                <h5 class="h4 font-weight-bold lay-color-orange">
                  VÍDEOS
                </h5>
              </div>
              <div class="tv-sidebar-video my-1 my-md-2 tv-sidebar-item d-flex" v-for="(item, index) in playlistData" :key="index" :class="index === currentVideo ? 'active' : ''" @click="selectVideo(index)">
                <div class="tv-sidebar-thumb overflow-hidden rounded">
                  <img :src="`https://img.youtube.com/vi/${item.ytID}/mqdefault.jpg`" :alt="item.title">
                </div>
                <div class="tv-sidebar-video-title mx-2 mx-md-3 py-1 d-flex align-items-center">
                  <h6 class="font-weight-normal mb-1" v-html="item.title"></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>            
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VimeoPlaylist',
    props: {
      playlistData: Array
    },
    data: function() {
      return {
        currentVideo: 0,
        playerVars: {
          enablejsapi: 1, // Control via javascript
          color: 'white', // Timeline color 
          fs: 0,  // FullScreen mode
          iv_load_policy: 0,  // Video annotations
          modestbranding: 0, // Remove Youtube logo
          origin: '', // Domani here
          rel: 0, // Disable random related videos - Now, only show videos from same channel
          widget_referrer: '', // Complete current URL for Youtube analitics
        }
      }
    },
    methods: {
      getCurrentVideoID: function () {
        if (this.playlistData[this.currentVideo] !== null) {
          return this.playlistData[this.currentVideo].ytID;
        }
      },
      selectVideo: function(newVideo) {
        this.currentVideo = newVideo;
      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  .c-vimeo-playlist
    position: relative
    z-index: 5
    .box-video
      background-color: #000
      /deep/ > div
        width: 100%
        min-height: 486px
        position: relative
        iframe
          position: absolute
          width: 100%
          height: 100% 
          top: 0
          left: 0
    .tv-sidebar
      display: -ms-flexbox
      display: -webkit-flex
      display: flex
      -webkit-flex-direction: column
      -ms-flex-direction: column
      flex-direction: column
      -webkit-flex-wrap: nowrap
      -ms-flex-wrap: nowrap
      flex-wrap: nowrap
      -webkit-justify-content: flex-start
      -ms-flex-pack: start
      justify-content: flex-start
      -webkit-align-content: stretch
      -ms-flex-line-pack: stretch
      align-content: stretch
      -webkit-align-items: center
      -ms-flex-align: center
      align-items: center

      .tv-sidebar-title
        -webkit-order: 0
        -ms-flex-order: 0
        order: 0
        -webkit-flex: 0 1 auto
        -ms-flex: 0 1 auto
        flex: 0 1 auto
        -webkit-align-self: flex-start
        -ms-flex-item-align: start
        align-self: flex-start

      .tv-sidebar-video:nth-child(2)
        -webkit-order: 0
        -ms-flex-order: 0
        order: 0
        -webkit-flex: 1 1 auto
        -ms-flex: 1 1 auto
        flex: 1 1 auto
        -webkit-align-self: center
        -ms-flex-item-align: center
        align-self: center
        width: 100%

      .tv-sidebar-video:nth-child(3)
        -webkit-order: 0
        -ms-flex-order: 0
        order: 0
        -webkit-flex: 1 1 auto
        -ms-flex: 1 1 auto
        flex: 1 1 auto
        -webkit-align-self: center
        -ms-flex-item-align: center
        align-self: center
        width: 100%

      .tv-sidebar-video:nth-child(4)
        -webkit-order: 0
        -ms-flex-order: 0
        order: 0
        -webkit-flex: 1 1 auto
        -ms-flex: 1 1 auto
        flex: 1 1 auto
        -webkit-align-self: center
        -ms-flex-item-align: center
        align-self: center
        width: 100%

      .tv-sidebar-item
        position: relative
        overflow: hidden
        &::before
          width: 100%
          height: 100%
          position: absolute 
          content: " "
          top: 0
          left: 0
          background-color: rgba(map-get($color-config, "orange"), .2)
          transition: all ease-out .2s
          opacity: 0
          width: 130px
          transform-origin: left center
          border-radius: .25rem
          z-index: 2
        &.active 
          &::before
            opacity: 1
            width: 100%
        .tv-sidebar-thumb
          --width: 130px
          width: var(--width)
          flex-basis: var(--width)
          flex-grow: 0
          flex-shrink: 0
          img
            width: var(--width)
            height: 100%
            object-fit: cover
        .tv-sidebar-video-title
          position: relative
          z-index: 3  

  @include media-breakpoint-down(lg)
    .c-vimeo-playlist
      .box-video
        /deep/ > div
          min-height: 420px

  @include media-breakpoint-down(md)
    .c-vimeo-playlist
      .box-video
        /deep/ > div
          min-height: 380px

  @include media-breakpoint-down(sm)
    .c-vimeo-playlist
      .box-video
        /deep/ > div
          min-height: auto
          padding-bottom: 56.3%

  @include media-breakpoint-down(xs)
    .c-vimeo-playlist
      .tv-sidebar
        .tv-sidebar-item
          .tv-sidebar-thumb
            --width: 100px
            min-height: 110px
</style>

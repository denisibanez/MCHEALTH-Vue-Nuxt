<template>
  <div class="c-section-three lay-bg-black overflow-hidden">
    <div class="w-100 py-5">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-12">
            <div class="row justify-content-center container-video-human-body">
              <div class="col-md-11 col-lg-10">
                <div class="row">
                  <section class="col-md-8 py-md-3 py-lg-8">
                    <h3 class="font-size-lg">
                      HISTÓRIAS DE VIDA <br>
                      REVELAM A IMPORTÂNCIA <br>
                      <span class="lay-color-orange">DA VACINAÇÃO</span>
                    </h3>
                    <div class="w-100">
                      <div class="row">
                        <div class="col-md-11">
                          <p class="lay-color-light-gray">
                            Carreiras inteiras dedicadas à medicina reforçam, como mostram os depoimentos dos profissionais de saúde, por que o desenvolvimento de drogas e vacinas é importante para a humanidade. O avanço científico, que ganhou ainda mais peso depois da pandemia causada pelo coronavírus, é feito de desafios que vão além dos laboratórios ou consultórios médicos. Buscar qualidade de vida e combater as fake news também fazem parte do trabalho. Veja Andrea Silva contando, em depoimento tocante, como é o seu cotidiano convivendo com a poliomielite, doença que pode ser evitada com algumas doses vacinais na infância. 
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div id="container-video" ref="refThree">
                <ThreeHumanBody :width="threeSizes.width" :height="threeSizes.height" />
                <div id="hidden-frame" :style="{width: threeSizes.width + 'px', height: threeSizes.height + 'px'}">
                  <div class="helper--1"></div>
                  <div class="helper--2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-11 box-detailed-right-top p-0">
            <span class="detail"></span>
            <div class="content overflow-hidden rounded">
              <div class="row no-gutters">
                <div class="col-md-8">
                  <VimeoPlayer :url="'407983251/b49f27b667'" />
                </div>
                <div class="col-md-4 p-4">
                  <div class="w-100 h-100 tv-sidebar">
                    <div class="tv-sidebar-title">
                      <h5 class="h4 font-weight-bold lay-color-orange">
                        VIDEOS
                      </h5>
                    </div>
                    <div class="tv-sidebar-video">
                      Lorem ipsum dolor sit amet consectetur
                    </div>
                    <div class="tv-sidebar-video">
                      Lorem ipsum dolor sit amet consectetur
                    </div>
                    <div class="tv-sidebar-video">
                      Lorem ipsum dolor sit amet consectetur
                    </div>
                  </div>
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
  import ThreeHumanBody from "./ThreeHumanBody";
  import VimeoPlayer from "./VimeoPlayer";

  export default {
    name: 'SectionThreeHumanBody',
    components: {
      ThreeHumanBody,
      VimeoPlayer,
    },
    data: function() {
      return {
        threeSizes: {
          width: 1000,
          height: 562,
        },
      }
    },
    methods: {
      updateCanvasSize: function () {
        this.threeSizes.width = this.$refs.refThree.clientWidth;
        this.threeSizes.height = this.$refs.refThree.clientHeight;
      }
    },
    mounted: function() {
      // this.updateCanvasSize();
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

  .container-video-human-body
    position: relative

    *
      position: relative
      z-index: 10

    #container-video
      --width: 1000px
      --height: calc((var(--width) / 16) * 9)
      position: absolute
      top: 50%
      z-index: 5
      margin-top: calc((var(--height) / 2) * -1)
      right: calc((var(--width) / 5) * -1)
      width: var(--width)
      height: var(--height)

      #hidden-frame
        display: block
        content: " "
        position: absolute
        top: 0
        left: 0
        z-index: 10

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
            background: linear-gradient(0deg, rgba(13,14,15,0) 0%, rgba(13,14,15,1) 100%)
          &::after
            opacity: 1
            background: linear-gradient(180deg, rgba(13,14,15,0) 0%, rgba(13,14,15,1) 100%)

        .helper--2
          &::before
            background: linear-gradient(270deg, rgba(13,14,15,0) 0%, rgba(13,14,15,1) 100%)
          &::after
            background: linear-gradient(90deg, rgba(13,14,15,0) 0%, rgba(13,14,15,1) 100%)

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



  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)
    .side-body-content
      padding-top: 60px
      padding-bottom: 60px
    .container-video-human-body
      #container-video
        width: 100%
        height: 100%
        top: 0
        left: 0
        margin-left: 0
        margin-top: 0

  @include media-breakpoint-down(xs)

</style>

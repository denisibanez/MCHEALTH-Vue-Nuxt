<template>
  <div class="c-section-three lay-bg-black overflow-hidden">
    <div class="w-100 pt-5">
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
    <div class="w-100 pb-5 pb-md-6 pb-lg-8">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <VimeoPlaylist :playlistData="playlistData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ThreeHumanBody from "./../ThreeHumanBody";
  import VimeoPlaylist from "./../VimeoPlaylist";

  export default {
    name: 'SectionThreeHumanBody',
    components: {
      ThreeHumanBody,
      VimeoPlaylist,
    },
    data: function() {
      return {
        threeSizes: {
          width: 1000,
          height: 562,
        },
        playlistData: [ 
          {
            title: "<b class='lay-color-orange'>JUAREZ CUNHA</b><br><small>Médico Pediatra e Presidente da Sociedade Brasileira de Imunização</small>",
            ytID: "SLD9xzJ4oeU",
          },
          {
            title: "<b class='lay-color-orange'>HELDER KAKAUA</b><br><small>Prof. PHD e Pesquisador Biologia Molecular USP</small>",
            ytID: "BSG5iHK9Scw",
          },
          {
            title: "<b class='lay-color-orange'>LEONARDO HILÁRIO</b><br><small>Engenheiro de Computação</small>",
            ytID: "NsRLOV4pHyk",
          },
        ],
      }
    },
    methods: {

    },
    mounted: function() {
      
    }
  }
</script>

<style lang="sass">
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  .c-section-three
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

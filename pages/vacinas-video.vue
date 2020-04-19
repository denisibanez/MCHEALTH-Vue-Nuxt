<template>
  <div>
    <div class="c-vacinas-video">
      <VideoTeaser :videoData="videoData" />
    </div>
  </div>
</template>

<script>
import VideoTeaser from "../components/VideoTeaser";

export default {
  components: {
    VideoTeaser,
  },
  head () {
    return {
      title: "Estadão - Saúde&Ciência",
      meta: [
        { hid: 'description', name: 'description', content: 'Um novo olhar da informação' }
      ]
    }
  },
  data: function() {
    return {
      videoData: {
        title: 'VACINAS',
        subtitle: 'POR QUE AINDA EXISTEM PESSOAS QUE SÃO CONTRA?',
        description: "Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.",
        button: "Assista",
        imgCover: "vacinas/video-teaser-poster.jpg",
        idVideoTeaser: "407726309/64dae15afb",
        idVideoTrailer: "407983251/b49f27b667",
      }
    }
  }
}
</script>

<style lang="sass">
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~bootstrap/scss/mixins'

  .c-vacinas-video
    top: 0
    left: 0
    height: 100vh
    width: 100%
    margin-top: -90px

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)
    .c-vacinas-video
      margin-top: -80px

</style>


<template>
  <div class="c-section-stories">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <section class="col-md-6 col-lg-5 py-4">
          <h3 class="font-size-lg">
            PROTEÇÃO AO LONGO<br>
            DE <span class="lay-color-orange">TODA A VIDA</span> 
          </h3>
          <p class="lay-color-light-gray">
            As vacinas são o caminho mais eficiente para a prevenção de diversas doenças, não somente na infância como também em outras fases da nossa vida. <span class="lay-color-orange">Conheça as vacinas disponíveis no Calendário Nacional de Vacinação do Ministério da Saúde além de outras vacinas importantes disponíveis em clínicas particulares. Estas informações não substituem a recomendação médica.</span> Consulte seu médico sobre vacinação.
          </p>
        </section>
        <div class="col-md-5 offset-md-1 col-lg-4 offset-lg-1 py-3">
          <!-- <Quiz :quizData="quizData" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Quiz from "./../Quiz";

  export default {
    name: 'SectionQuiz',
    components: {
      // Quiz,
    },
    data: function() {
      return {
        storiesData: [
          {
            name: 'BCG',
            colorBg: '#F6AAAC',
            colorText: '#F6AAAC',
            colorIcon: '#F6AAAC',
            imgThumb: 'vacinas/stories/01-bcg/cover-title.png',
            stories: {
              cover: {
                imgTitle: 'vacinas/stories/01-bcg/cover-title.png',
                imgCenter: 'vacinas/stories/01-bcg/cover-content.png',
              },
              others: [
                {
                  img: 'vacinas/stories/01-bcg/02.png'
                },{
                  img: 'vacinas/stories/01-bcg/03.png'
                },{
                  img: 'vacinas/stories/01-bcg/04.png'
                },
              ]
            },
          },
          {
            name: 'BCG2',
            colorBg: '#F6AAAC',
            colorText: '#F6AAAC',
            imgThumb: 'vacinas/stories/01-bcg/cover-title.png',
            stories: {
              cover: {
                imgTitle: 'vacinas/stories/01-bcg/cover-title.png',
                imgCenter: 'vacinas/stories/01-bcg/cover-content.png',
              },
              others: [
                {
                  img: 'vacinas/stories/01-bcg/02.png'
                },{
                  img: 'vacinas/stories/01-bcg/03.png'
                },{
                  img: 'vacinas/stories/01-bcg/04.png'
                },
              ]
            },
          },
        ]
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

  .c-section-stories
    position: relative
    overflow: hidden
      
  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)

</style>

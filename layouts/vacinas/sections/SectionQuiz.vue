<template>
  <div class="c-section-quiz">
    <div class="background-effect" :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/map-net.png') + ')' }"></div>
    <div class="w-100 my-5 my-md-10 content-section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <section class="col-md-6 col-lg-5 py-4">
            <h3 class="font-size-lg">
              FAKE NEWS: <br>
              <span class="lay-color-orange">UMA AMEAÇA REAL!</span> 
            </h3>
            <div class="w-100">
              <p class="lay-color-light-gray">
                Apesar da vacinação ser obrigatória no Brasil desde 1976, é crescente o número de pessoas que se autointitulam antivacinistas. O pediatra Clóvis Francisco Constantino, primeiro vice-presidente da Sociedade Brasileira de Pediatria e professor de ética na Universidade Santo Amaro, alerta que está mais comum ouvir nos consultórios médicos dúvidas dos pais se devem ou não vacinar os filhos. As indagações são baseadas na leitura de informações falsas ou relatos equivocados distribuídos pelas redes sociais.
              </p>
              <div class="w-100 p-3 p-md-4 p-lg-5 lay-bg-codgray-transp-50 rounded border lay-border-orange mt-3 mt-md-6">
                <p class="lay-color-light-gray">
                  Pesquisa feita pela Sociedade Brasileira de Imunizações e pela ONG Avaaz em 2019 mostra que 67% dos brasileiros acreditam em ao menos uma afirmação imprecisa sobre vacinação.
                </p>
                <h4>Você consegue reconhecer quais dessas informações são <span class="lay-color-orange">Fake News?</span></h4>
                <p class="lay-color-light-gray m-0">
                  Responda o quiz ao lado e descubra!
                </p>
              </div>
            </div>
          </section>
          <div class="col-md-5 offset-md-1 col-lg-4 offset-lg-1 py-3">
            <Quiz :quizData="quizData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Quiz from "./../Quiz";

  export default {
    name: 'SectionQuiz',
    components: {
      Quiz,
    },
    data: function() {
      return {
        quizData: [
          {
            image: "vacinas/quiz/disease-01.png",
            question: "Mesmo com a <span class='lay-color-orange'>eliminação das doenças</span>, é necessário continuar tomando vacinas.",
            feedback: "Nos últimos três anos, a febre amarela e o sarampo voltaram, o que mostra a necessidade das vacinas.",
            answer: null,
            confirmed: null,
            correctAnswer: true,
          },
          {
            image: "vacinas/quiz/baby-01.png",
            question: "Tomar muitas vacinas pode sobrecarregar o <span class='lay-color-orange'>sistema imunológico</span> do bebê.",
            feedback: "O bebê recebe 30 vacinas em dois anos, mas sem afetar em nada o sistema imunológico.",
            answer: null,
            confirmed: null,
            correctAnswer: false,
          },
          {
            image: "vacinas/quiz/old-lady-01.png",
            question: "Algumas vacinas ajudam a <span class='lay-color-orange'>prevenir câncer.</span>",
            feedback: "As vacinas que bloqueiam as hepatites e o HPV evitam tumores no fígado e no colo do útero, respectivamente. ",
            answer: null,
            confirmed: null,
            correctAnswer: true,
          },
          {
            image: "vacinas/quiz/reaction-01.png",
            question: "<span class='lay-color-orange'>Reações à vacina</span> podem ser tão ruins quanto a própria doença e podem levar à morte. ",
            feedback: "A maior parte das reações são leves, como dor local e febre baixa. Consequências graves são extremamente raras.",
            answer: null,
            confirmed: null,
            correctAnswer: false,
          },
          {
            image: "vacinas/quiz/old-men-01.png",
            question: "Idosos costumam desenvolver gripe logo <span class='lay-color-orange'>após se vacinarem</span> contra a doença.",
            feedback: "Pessoas que ficam gripadas após a vacinação já estavam infectadas pelo vírus antes de se vacinar.",
            answer: null,
            confirmed: null,
            correctAnswer: false,
          }
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

  .c-section-quiz
    position: relative
    overflow: hidden

    .background-effect
      position: absolute
      width: 105%
      height: 100%
      top: 0%
      left: 0
      background-position: center center
      background-size: cover
      background-repeat: no-repeat
      -webkit-animation-name: MovingSideways
      -webkit-animation-duration: 30s
      -webkit-animation-iteration-count: infinite
      -webkit-animation-timing-function: ease-in-out
      -moz-animation-name: MovingSideways
      -moz-animation-duration: 30s
      -moz-animation-iteration-count: infinite
      -moz-animation-timing-function: ease-in-out

  @-webkit-keyframes MovingSideways
    from 
      -webkit-transform: translate(0%, 0px)
    65% 
      -webkit-transform: translate(-4%, 0px)
    to 
      -webkit-transform: translate(0%, 0px)
      
  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)
    .c-section-quiz
      .background-effect
        display: none
        -webkit-animation-name: none
        -moz-animation-name: none
  @include media-breakpoint-down(xs)

</style>

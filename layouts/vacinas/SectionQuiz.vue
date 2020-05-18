<template>
  <div class="c-section-quiz">
    <div class="w-100 my-5 my-md-10">
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
  const Quiz = () => import('./Quiz');
  
  export default {
    name: 'SectionQuiz',
    components: {
      Quiz,
    },
    data: function() {
      return {
        quizData: [
          {
            image: "vacinas/quiz/beach.png",
            question: "Mesmo com a <span class='lay-color-orange'>eliminação das doenças</span>, é necessário continuar tomando vacinas.",
            feedback: "Nos últimos três anos, a febre amarela e o sarampo voltaram, o que mostra a necessidade das vacinas.",
            answer: null,
            confirmed: null,
            correctAnswer: true,
          },
          {
            image: "vacinas/quiz/jellyfish.png",
            question: "Tomar <span class='lay-color-orange'>muitas vacinas</span> pode sobrecarregar o sistema imunológico do bebê.",
            feedback: "O bebê recebe 30 vacinas em dois anos, mas sem afetar em nada o sistema imunológico.",
            answer: null,
            confirmed: null,
            correctAnswer: false,
          },
          {
            image: "vacinas/quiz/rain.png",
            question: "Algumas vacinas ajudam a <span class='lay-color-orange'>prevenir o câncer</span>.",
            feedback: "As vacinas que bloqueiam as hepatites e o HPV evitam tumores no fígado e no colo do útero, respectivamente. ",
            answer: null,
            confirmed: null,
            correctAnswer: true,
          },
          {
            image: "vacinas/quiz/threes.png",
            question: "<span class='lay-color-orange'>Reações à vacina</span> podem ser tão ruins quanto a própria doença e podem levar à morte. ",
            feedback: "A maior parte das reações são leves, como dor local e febre baixa. Consequências graves são extremamente raras.",
            answer: null,
            confirmed: null,
            correctAnswer: false,
          },
          {
            image: "vacinas/quiz/jellyfish.png",
            question: "Idosos costumam desenvolver gripe logo <span class='lay-color-orange'>após se vacinarem contra a doença</span>.",
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

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)

</style>

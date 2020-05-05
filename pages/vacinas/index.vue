<template>
  <div class="c-vacinas">
    <BannerTrendsSearches :bannerData="bannerTrendsData" />
    <div class="w-100 mb-10">
      <div class="container">
        <div class="row no-gutters">
          <div class="col-12 box-detailed-left-top">
            <span class="detail"></span>
            <div class="content overflow-hidden">
              <div class="row justify-content-center container-video-human-body">
                <div class="col-md-10">
                  <div class="row">
                    <section class="col-md-8 side-body-content">
                      <h3 class="font-size-lg">
                        TOMAR VACINA <br>
                        É MESMO <span class="lay-color-orange">IMPORTANTE?</span>
                      </h3>
                      <div class="w-100">
                        <div class="row">
                          <div class="col-md-8">
                            <p class="lay-color-light-gray">
                              Vacinação é uma das conquistas mais importantes da saúde pública e foi responsável por um aumento de 30 anos na expectativa de vida. Você sabe como elas alcançaram tudo isso? O pesquisador Luís Carlos Ferreira, da ICB-USP explica o que são vacinas, como elas atuam e porque vacinação é importante.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <div id="container-video" ref="refThree">
                  <ThreeHumanBody :width="threeSizes.width" :height="threeSizes.height" />
                  <div id="hidden-frame">
                    <div class="helper--1"></div>
                    <div class="helper--2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 my-10">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <section class="col-md-5 side-body-content">
            <h3 class="font-size-lg">
              COMO AS VACINAS<br>
              <span class="lay-color-orange">ELIMINAM DOENÇAS?</span> 
            </h3>
            <div class="w-100">
              <p class="lay-color-light-gray">
                As vacinas são o meio mais seguro e eficaz de proteger as pessoas contra algumas doenças infecciosas. Seu impacto na humanidade é grandioso: <span class="lay-color-orange">aumentaram a expectativa de vida da população, reduziram a mortalidade infantil e controlaram epidemias.</span>
              </p>
              <div class="w-100 p-5 lay-bg-codgray-transp-50 rounded border lay-border-orange mt-6">
                <p class="lay-color-light-gray">
                  Mas o ato de se vacinar vai muito além da prevenção individual. Quando uma pessoa se imuniza, ela protege as que ainda não estão imunizadas.
                </p>
                <h4>E se você pudesse eliminar uma doença, <span class="lay-color-orange">será que conseguiria?</span></h4>
                <p class="lay-color-light-gray m-0">
                  Jogue o minigame ao lado e veja se é capaz! 
                </p>
              </div>
            </div>
          </section>
          <div class="col-md-4 offset-md-1">
            <div class="w-100" ref="refContainerGame">
              <Game />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 my-10">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <section class="col-md-5 side-body-content">
            <h3 class="font-size-lg">
              FAKE NEWS: <br>
              <span class="lay-color-orange">UMA AMEAÇA REAL!</span> 
            </h3>
            <div class="w-100">
              <p class="lay-color-light-gray">
                Apesar da vacinação ser obrigatória no Brasil desde 1976, é crescente o número de pessoas que se autointitulam antivacinistas. O pediatra Clóvis Francisco Constantino, primeiro vice-presidente da Sociedade Brasileira de Pediatria e professor de ética na Universidade Santo Amaro, alerta que está mais comum ouvir nos consultórios médicos dúvidas dos pais se devem ou não vacinar os filhos. As indagações são baseadas na leitura de informações falsas ou relatos equivocados distribuídos pelas redes sociais.
              </p>
              <div class="w-100 p-5 lay-bg-codgray-transp-50 rounded border lay-border-orange mt-6">
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
          <div class="col-md-4 offset-md-1">
            <Quiz :quizData="quizData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BannerTrendsSearches from "../../layouts/vacinas/BannerTrendsSearches";
import ThreeHumanBody from "../../layouts/vacinas/ThreeHumanBody";
import Game from "../../layouts/vacinas/Game";
import Quiz from "../../layouts/vacinas/Quiz";

export default {
  components: {
    BannerTrendsSearches,
    ThreeHumanBody,
    Game,
    Quiz,
  },
  data: function() {
    return {
      threeSizes: {
        width: 1000,
        height: 562,
      },
      bannerTrendsData: {
        mainTerm: "Vacinas",
        options: [ 
          {
            index: 0,
            phrase: "<b>são perigosas ao bebê?</b>",
          },
          {
            index: 1,
            phrase: "<b>deixam sequelas?</b>",
          },
          {
            index: 2,
            phrase: "<b>efeitos negativos</b>",
          },
          {
            index: 3,
            phrase: "onde tomar?",
          },
          {
            index: 4,
            phrase: "para o que servem?",
          }
        ]
      },
      videoCarouselData: [
        {
          index: 0,
          enabled: false,
          poster: "banner-poluicao.png",
          videoUrl: "https://www.youtube.com/watch?v=eLeIJtLebZk",
        },
        {
          index: 1,
          enabled: false,
          poster: "banner-poluicao.png",
          videoUrl: "https://www.youtube.com/watch?v=eLeIJtLebZk",
        },
        {
          index: 3,
          enabled: false,
          poster: "banner-poluicao.png",
          videoUrl: "https://www.youtube.com/watch?v=eLeIJtLebZk",
        }
      ],
      quizData: [
        {
          image: "vacinas/quiz/eggs.png",
          question: "Pessoas <span class='lay-color-orange'>alérgicas a ovo</span> não podem tomar vacina.",
          feedback: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          answer: null,
          confirmed: null,
          correctAnswer: true,
        },
        {
          image: "vacinas/quiz/beach.png",
          question: "Consectetur adipiscing elit, <span class='lay-color-orange'>sed do eiusmod tempor</span> incididunt ut labore et dolore magna aliqua.",
          feedback: "Ut morbi tincidunt augue interdum velit euismod.",
          answer: null,
          confirmed: null,
          correctAnswer: true,
        },
        {
          image: "vacinas/quiz/jellyfish.png",
          question: "Senectus et netus et malesuada fames ac <span class='lay-color-orange'>lorem donec</span> massa sapien faucibus.",
          feedback: "Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim.",
          answer: null,
          confirmed: null,
          correctAnswer: true,
        },
        {
          image: "vacinas/quiz/rain.png",
          question: "Neque gravida in fermentum et. Fermentum <span class='lay-color-orange'>posuere urna nec</span> tincidunt praesent semper feugiat nibh sed.",
          feedback: "Diam ut venenatis tellus in metus vulputate. Facilisis magna etiam tempor orci eu lobortis elementum.",
          answer: null,
          confirmed: null,
          correctAnswer: true,
        },
        {
          image: "vacinas/quiz/threes.png",
          question: "<span class='lay-color-orange'>Metus vulputate</span> eu scelerisque felis imperdiet proin fermentum leo aenean et tortor.",
          feedback: "Labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius.",
          answer: null,
          confirmed: null,
          correctAnswer: true,
        }
      ]
    }
  },
  head () {
    return {
      title: "Estadão - Saúde&Ciência | Vacinas"
    }
  },
  methods: {
    updateCanvasSize: function () {
      this.threeSizes.width = this.$refs.refThree.clientWidth;
      this.threeSizes.height = this.$refs.refThree.clientHeight;
    }
  },
  mounted: function() {
    this.updateCanvasSize();
  },
  transition: {
    name: 'transition',
    mode: 'out-in'
  }
}
</script>

<style lang="sass">
  .transition-enter-active, 
  .transition-leave-active
    transition: opacity .4s ease-out 

  .transition-enter, 
  .transition-leave-active
    opacity: 0

  .c-vacinas
    background-color: #1B1E21


  .side-body-content
    padding-top: 100px
    padding-bottom: 100px

  .box-detailed-left-top
    // overflow: hidden

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
      right: calc((var(--width) / 7) * -1)
      width: var(--width)
      height: var(--height)

      #hidden-frame
        display: block
        content: " "
        position: absolute
        width: 100%
        height: 100%
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
</style>

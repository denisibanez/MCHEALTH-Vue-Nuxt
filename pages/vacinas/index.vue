<template>
  <div class="c-vacinas">
    <Banner />
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
        <div class="row align-items-center justify-content-between">
          <section class="col-md-6 side-body-content">
            <h3 class="font-size-lg">
              COMO AS VACINAS <br>
              <span class="lay-color-orange">ERRADICAM</span> DOENÇAS?
            </h3>
            <div class="w-100">
              <div class="row">
                <div class="col-md-8">
                  <p class="lay-color-light-gray">
                    A importância da vacinação vai muito além da prevenção individual. “Quando uma pessoa é imunizada, protege, de forma indireta, as que não foram. É como se formasse um escudo de proteção em torno das que não podem se vacinar”, esclarece a pediatra Eliane Matos, da Fudação Oswaldo Cruz.  
                  </p>
                  <h4>Só você pode mudar esse cenário.</h4>
                  <p class="lay-color-light-gray">
                    Jogue o minigame ao lado e descubra como!
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div class="col-md-5 text-center text-md-right">
            <Game />
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 my-10">
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <section class="col-md-6 side-body-content">
            <h3 class="font-size-lg">
              POR QUE ESTAMOS NOS
              <span class="lay-color-orange">VACINANDO</span> MENOS? 
            </h3>
            <div class="w-100">
              <div class="row">
                <div class="col-md-8">
                  <p class="lay-color-light-gray">
                    São muitas as hipóteses. A primeira se tornou um dos maiores riscos à saúde global: as fake news que circulam a internet desencorajando pessoas de tomar vacinas.
                  </p>
                  <p class="lay-color-light-gray">
                    “Especialmente na América do Sul, não há muita influência dos movimentos anti vacinas, mas as informações falsas são motivos de grande preocupação” nota Lely Guzman, especialista em imunização da Organização Pan-Americana de Saúde. 
                  </p>
                  <h4>Você consegue reconhecer quais dessas informações são <span class="lay-color-orange">Fake News?</span></h4>
                  <p class="lay-color-light-gray">
                    Responda o quis ao lado e descubra!
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div class="col-md-5 text-center">
            [[INSERT QUIZ]]
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../../layouts/vacinas/Banner";
import ThreeHumanBody from "../../layouts/vacinas/ThreeHumanBody";
import Game from "../../layouts/vacinas/Game";

export default {
  components: {
    Banner,
    ThreeHumanBody,
    Game,
  },
  data: function() {
    return {
      threeSizes: {
        width: 1000,
        height: 562,
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

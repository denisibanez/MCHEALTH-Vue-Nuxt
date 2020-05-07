<template>
  <div class="c-quiz">
    <div class="quiz-container shadow-lg rounded" 
    :style="{ '--x': parallax.x, '--y': parallax.y }"
    v-on:mousemove="handleMouseMove($event)"
    ref="refContainer">
      <div class="quiz-bg" :style="{ backgroundImage: 'url(' + require('@/assets/images/' + quizData[currentQuest].image) + ')'}"></div>
      <span class="quiz-shadow"></span>
      <div class="quiz-question-box d-flex align-items-center p-2 p-sm-5  text-center" ref="refQuestion">
        <h4 v-html="quizData[currentQuest].question" class="h2 p-1 p-md-4 font-weight-bold"></h4>
      </div>
      <div class="quiz-feedback-box" ref="refFeedback">
        <div class="w-100 h-100 d-flex align-items-center p-5 text-center" v-if="quizData[currentQuest].answer !== null && quizData[currentQuest].confirmed">
          <div class="w-100">
            <div class="mb-3" v-if="quizData[currentQuest].answer === quizData[currentQuest].correctAnswer &&  quizData[currentQuest].confirmed">
              <span class="icomoon-checked-circle lay-color-orange quiz-feedback-icon"></span>
              <h3 class="lay-color-light-gray">
                CORRETO
              </h3>
            </div>
            <div class="mb-3" v-if="quizData[currentQuest].answer !== quizData[currentQuest].correctAnswer &&  quizData[currentQuest].confirmed">
              <span class="icomoon-x-circle lay-color-orange quiz-feedback-icon"></span>
              <h3 class="lay-color-light-gray">
                ERRADO
              </h3>
            </div>
            <h4 v-if="quizData[currentQuest].correctAnswer === true" class="h1 px-4 font-weight-bold lay-color-orange">
              VERDADEIRO!
            </h4>
            <h4 v-else class="h1 px-4 font-weight-bold lay-color-orange">
              FALSO!
            </h4>
            <p v-html="quizData[currentQuest].feedback" class="lay-color-light-gray mx-1 mx-md-4 mb-4"></p>
            <button class="btn btn-default-orange-button-arrow lay-color-black c-magnetic quiz-btn-next" ref="refBtnNext"
            @click="nextQuestion()"
            v-html="currentQuest < (quizData.length - 1) ? 'Próximo' : 'Concluir'"></button>
          </div>
        </div>
      </div>
      <div class="quiz-answer-btns pl-5 pr-5 pb-5" ref="refBtnsAnswer">
        <div class="row no-gutters">
          <div class="col-6 pr-4">
            <button class="btn btn-default-orange lay-color-black c-magnetic w-100 btn-answer-quiz px-1" 
            :class="quizData[currentQuest].answer === true ? 'active' : ''"
            @click="answerQuestion(true)">
              Verdadeiro
            </button>
          </div>
          <div class="col-6 pl-4">
            <button class="btn btn-default-orange lay-color-black c-magnetic w-100 btn-answer-quiz px-1" 
            :class="quizData[currentQuest].answer === false ? 'active' : ''"
            @click="answerQuestion(false)">
              Falso
            </button>
          </div>
        </div>
      </div>
      <div class="quiz-endfeedback-box" ref="refEndFeedback">
        <div class="w-100 h-100 d-flex align-items-center p-5" style="overflow: scroll;" v-if="completed">
          <div class="w-100" v-if="getScore() > (quizData.length - 3)">
            <h3 class="lay-color-orange m-0">
              Parabéns
            </h3>
            <p class="mb-3">
              Você acertou <b class="lay-color-orange">{{ getScore() }}</b> de <b class="lay-color-orange">{{quizData.length}}</b>
            </p>
            <h3 class="h1 font-weight-bold">
              Você é <br>
              um expert <br>
              em vacinas!
            </h3>
            <p class="lay-color-light-gray">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt uta.
            </p>
            <p class="lay-color-light-gray">
              Compartilhe
            </p>
            <social-sharing url="https://vuejs.org/"
              title="The Progressive JavaScript Framework"
              description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
              quote="Vue is a progressive framework for building user interfaces."
              hashtags="vuejs,javascript,framework"
              twitter-user="vuejs"
              inline-template
              class="mb-3">
              <div>
                <network network="facebook">
                  <span class="icomoon-facebook lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
                </network>
                <network network="linkedin">
                  <span class="icomoon-linkedin lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
                </network>
                <network network="whatsapp">
                  <span class="icomoon-whatsapp lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
                </network>
                <network network="twitter">
                  <span class="icomoon-twitter lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
                </network>
                <network network="email">
                  <span class="icomoon-letter lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
                </network>
              </div>
            </social-sharing>
            <a v-on:click.prevent.stop="restartQuiz()" class="lay-color-light-gray text-decoration-none">
              <span class="icomoon-reload"></span> Jogar novamente
            </a>
          </div>
          <div class="w-100" v-else>
            <h3 class="lay-color-orange m-0">
              Sinto muito...
            </h3>
            <p class="mb-3">
              Você acertou apenas <b class="lay-color-orange">{{ getScore() }}</b> de <b class="lay-color-orange">{{quizData.length}}</b>
            </p>
            <h3 class="h1 font-weight-bold">
              Mas não <br>
              fique triste!<br>
            </h3>
            <p class="lay-color-light-gray">
              Começe novamente e use seus novos conhecimentos para se tornar um expert em vacinas.
            </p>
            <a v-on:click.prevent.stop="restartQuiz()" class="lay-color-light-gray text-decoration-none">
              <span class="icomoon-reload"></span> Jogar novamente
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="quiz-pagination pt-4 text-center">
      <span class="quiz-page" v-for="(item, index) in quizData" :key="item.question" :class="index <= currentQuest ? 'active' : ''"></span>
    </div>
  </div>
</template>

<script>
  import gsap from "gsap";
  import TweenLite from "gsap";
  var SocialSharing = require("vue-social-sharing");

  if (process.client) {
    gsap.registerPlugin(TweenLite);
  }

  export default {
    name: 'Quiz',
    props: {
      quizData: Array
    },
    components: {
      SocialSharing,
    },
    data: function() {
      return {
        currentQuest: 0,
        completed: true,
        parallax: {
          x: 0,
          y: 0,
        }
      }
    },
    methods: {
      handleMouseMove: function(event) {
        let { refContainer } = this.$refs;

        if (refContainer) {
          this.parallax.x = event.clientX - (refContainer.getBoundingClientRect().left + Math.floor(refContainer.clientWidth / 2));
          this.parallax.y = event.clientY - (refContainer.getBoundingClientRect().top + Math.floor(refContainer.clientHeight / 2));
        }
      },
      answerQuestion: function(answer) {
        if (this.quizData[this.currentQuest].answer === null) {
          this.quizData[this.currentQuest].answer = answer;

          setTimeout(() => {
            this.quizData[this.currentQuest].confirmed = true;
            let { refFeedback, refBtnNext, refQuestion, refBtnsAnswer } = this.$refs;

            TweenLite.to(refQuestion, .5, { opacity: 0, display: 'none'});
            TweenLite.to(refBtnsAnswer, .3, { opacity: 0, display: 'none', scale: .8});

            setTimeout(() => {
              let { refFeedback, refBtnNext } = this.$refs;

              TweenLite.to(refFeedback, .5, { opacity: 1, display: 'block'});
              TweenLite.to(refBtnNext, .3, { opacity: 1 }).delay(1.5);
            }, 300);
          }, 700);
        }
      },
      nextQuestion: function() {
        if (this.currentQuest < (this.quizData.length - 1)) {
          let { refFeedback, refBtnNext  } = this.$refs;

          TweenLite.to(refFeedback, .5, { opacity: 0 });            
          TweenLite.to(refBtnNext, .3, { opacity: 0 });
          TweenLite.to(refFeedback, .1, { display: 'none'}).delay(.6);

          setTimeout(() => {
            this.currentQuest += 1;

            setTimeout(() => {
              let { refQuestion, refBtnsAnswer } = this.$refs;

              TweenLite.to(refQuestion, .5, { opacity: 1, display: 'block'});
              TweenLite.to(refBtnsAnswer, .3, { opacity: 1, display: 'block', scale: 1});
            }, 300);
          }, 700);
        } else {
          this.finishQuiz();
        }
      },
      finishQuiz: function() {
        let { refFeedback, refBtnNext, refQuestion, refBtnsAnswer } = this.$refs;

        TweenLite.to(refFeedback, .5, { opacity: 0, display: 'none'});            
        TweenLite.to(refQuestion, .5, { opacity: 0, display: 'none'});
        TweenLite.to(refBtnsAnswer, .3, { opacity: 0, display: 'none', scale: .8});
        TweenLite.to(refBtnNext, .3, { opacity: 0 });

        setTimeout(() => {
          this.completed = true;

          setTimeout(() => {
            let { refEndFeedback } = this.$refs;
            
            TweenLite.to(refEndFeedback, .5, { opacity: 1, display: 'block'});            
          }, 300);
        }, 700);
      },
      getScore: function() {
        let score = 0;
        this.quizData.forEach(question => {
          if(question.confirmed && question.answer === question.correctAnswer) {
            score++;
          }
        });

        return score;
      },
      restartQuiz: function() {
        let { refFeedback, refBtnNext , refEndFeedback} = this.$refs;

        TweenLite.to(refEndFeedback, .5, { opacity: 0, display: 'none'});            
        TweenLite.to(refFeedback, .5, { opacity: 0, display: 'none'});            
        TweenLite.to(refBtnNext, .3, { opacity: 0 });

        setTimeout(() => {
          this.completed = false;
          this.currentQuest = 0;

          this.quizData.forEach(question => {
            question.confirmed = false;
            question.answer = null;
          });
          
          setTimeout(() => {
            let { refQuestion, refBtnsAnswer } = this.$refs;
            
            TweenLite.to(refQuestion, .5, { opacity: 1, display: 'block'});
            TweenLite.to(refBtnsAnswer, .3, { opacity: 1, display: 'block', scale: 1}); 
          }, 300);
        }, 500);
      }
    },
    mounted() {
      let { refQuestion, refBtnsAnswer } = this.$refs;

      TweenLite.to(refQuestion, .5, { opacity: 1, display: 'block'});
      TweenLite.to(refBtnsAnswer, .5, { opacity: 1, display: 'block', scale: 1});

      console.log(this.quizData.length);
    },
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  .c-quiz
    width: 100%
    touch-action: manipulation
    display: inline-block
    position: relative

    &::before
      border-radius: 5px
      display: block
      content: " "
      width: 300px
      height: 300px
      border: 1px solid map-get($color-config, "orange")
      position: absolute
      left: -15px
      top: -15px

    .quiz-container
      --x: 0
      --y: 0
      --d: 50
      min-height: 700px
      background-color: #25292C
      position: relative
      overflow: hidden

      .quiz-bg
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 1
        background-position: center center
        background-repeat: no-repeat
        background-size: cover 
        transition: all .5s ease-out

      .quiz-shadow
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        background: linear-gradient(0deg, rgba(27,30,33,1) 0%, rgba(27,30,33,1) 5%, rgba(27,30,33,0.7) 100%)
        z-index: 2

      .quiz-question-box,
      .quiz-feedback-box,
      .quiz-endfeedback-box
        --d: 30
        position: absolute
        width: 100%
        top: 0
        left: 0
        z-index: 3
        transition: all .5s ease-out
        display: none
        opacity: 0

      .quiz-question-box
        height: calc(100% - 90px)
      
      .quiz-feedback-box,
      .quiz-endfeedback-box
        height: 100%

      .quiz-endfeedback-box
        background-color: #2E3337
        z-index: 4

      .quiz-answer-btns
        position: absolute
        width: 100%
        bottom: 0
        left: 0
        z-index: 3
        display: none
        opacity: 0
        transform: scale(.8) 
        
        .btn-answer-quiz
          position: relative
          &::before
            position: absolute
            display: block
            content: " "
            width: calc(100% + 10px)
            height: calc(100% + 10px)
            top: -5px
            left: -5px
            border-radius: 7px
            border: 2px solid map-get($color-config, 'orange')
            opacity: 0
            transform: scale(.9)
            transition: all .2s ease-out

          &.active
            &::before
              opacity: 1
              transform: scale(1)  

      @media (hover: hover)
        &:hover 
          .quiz-bg
            transform: scale(1.025) translate(calc(var(--x) / var(--d) * 1px), calc(var(--y) / var(--d) * 1px))
          .quiz-question-box,
          .quiz-feedback-box
            transform: translate(calc(var(--x) / var(--d) * -1px), calc(var(--y) / var(--d) * -1px))
    
    .quiz-pagination
      text-align: center
      .quiz-page
        display: inline-block
        margin: 5px
        width: 8px
        height: 8px
        border-radius: 50%
        background-color: rgba(white, .1)
        transition: all 0.2s ease-out

        &.active
          background-color: map-get($color-config, 'orange')

    .quiz-feedback-icon
      font-size: 50px
    
    .quiz-btn-next
      opacity: 0

  @keyframes animatedBackground
    from
      background-position: 0 0
    to
      background-position: -1000px 0

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)
    .c-quiz
      .quiz-container
        min-height: 600px

  @include media-breakpoint-down(sm)
    .c-quiz
      &::before
        display: none
  @include media-breakpoint-down(xs)

</style>

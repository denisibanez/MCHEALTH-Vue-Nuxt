<template>
  <div class="w-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-4 mt-8">
          <Quiz :quizData="quizData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quiz from "../../layouts/vacinas/Quiz";

export default {
  components: {
    Quiz,
  },
  data: function() {
    return {
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

</style>

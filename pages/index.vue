<template>
  <div>
    <Carousel :slideData="slideData" />
    <Footer msg="Um novo olhar da informação, sed diam nonumy eirmod tempor." />
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import Footer from "../layouts/partials/Footer";

export default {
  components: {
    Carousel,
    Footer,
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
      slideData: [
        {
          index: 0,
          enabled: false,
          headline: "POLUIÇÃO",
          description: "Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.",
          button: "Descubra",
          imgName: "banner-poluicao.png",
          link: "",
        },
        {
          index: 1,
          headline: "VACINAS",
          enabled: true,
          description: "Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.",
          button: "Descubra",
          imgName: "banner-vacinas.png",
          link: "/vacinas",
        },
        {
          index: 2,
          headline: "DEPRESSÃO",
          enabled: false,
          description: "Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.",
          button: "Descubra",
          imgName: "banner-depressao.png",
          link: "",
        },
      ]
    }
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
</style>


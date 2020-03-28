<template>
  <div>
    <Carousel :slideData="slideData" />
  </div>
</template>

<script>
import Carousel from "../components/Carousel";

export default {
  components: {
    Carousel,
  },
  data: function() {
    return {
      slideData: [
        {
          index: 0,
          enabled: false,
          headline: 'POLUIÇÃO',
          description: 'Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.',
          button: 'Descubra',
          imgName: 'banner-poluicao.png'
        },
        {
          index: 1,
          headline: 'VACINAS',
          enabled: true,
          description: 'Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.',
          button: 'Descubra',
          imgName: 'banner-vacinas.png'
        },
        {
          index: 2,
          headline: 'DEPRESSÃO',
          enabled: false,
          description: 'Enquanto não há vacina contra pragas digitais, nos resta explicar os diversos aspectos sobre as vacinas e derrubar todos os mitos que rodeiam o tema.',
          button: 'Descubra',
          imgName: 'banner-depressao.png'
        },
      ]
    }
  }
}
</script>

<style lang="scss">
  
</style>

<template>
  <div class="c-section-carousel-cards overflow-hidden">
    <div class="w-100 my-5 my-md-10 content-section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <section class="col-md-4 col-lg-3 py-4">
            <h3 class="font-size-lg">
              <span class="lay-color-orange">VACINAS</span><br>
              SÃO VÍTIMAS<br>
              DO PRÓPRIO<br>
              SUCESSO
            </h3>
          </section>
          <section class="col-md-8 col-lg-7 py-4">
            <p class="lay-color-light-gray">
              Varíola e poliomielite são palavras que ainda aparecem na memória das pessoas, mas poucos conhecem alguém que tenha tido essas doenças. Até poucas décadas atrás, no entanto, era totalmente diferente, elas aterrorizavam a população. Graças ao êxito de campanhas de vacinação, esses e outros males estão erradicados no Brasil e em outros lugares do mundo. As duas enfermidades se encaixam perfeitamente no ditado popular “é melhor prevenir do que remediar”. <span class="lay-color-orange">Atualmente várias doenças ameaçam voltar se as pessoas não continuarem se vacinado.</span> <br>
              Entenda um pouco melhor esta realidade.
            </p>
            <p class="font-weight-bold">Doenças que ameaçam voltar devido à baixa taxa de vacinação: </p>
          </section>
          <div class="col-10 col-sm-12 col-md-12 col-lg-10 py-3">
            <CarouselCards :carouselData="carouselData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CarouselCards from "../CarouselCards";

  export default {
    name: 'SectionCarouselCards',
    components: {
      CarouselCards,
    },
    data: function() {
      return {
        carouselData: [
          {
            image: "vacinas/cards/sick-baby-red-dots-1.png",
            title: "SARAMPO",
            timeline: [
              {
                content: "Doença foi eliminada no Brasil em 2016.",
              },
              {
                content: "Nos últimos anos milhares de casos foram confirmados no país e em 2019 o Brasil perdeu o certificado de eliminação da doença.",
              },
              {
                content: "Devido à incidência da doença nos últimos anos, o esforço do governo fez com que em 2019 o Brasil atingisse 99,4% de cobertura vacinal. Entretanto 8 estados ainda estão abaixo da meta.",
              }
            ],
          },
          {
            image: "vacinas/cards/little-boy-vaccine.png",
            title: "POLIOMELITE",
            timeline: [
              {
                content: "Doença foi eliminada no Brasil em 1994.",
              },
              {
                content: "Nos últimos anos houve registro da doença na Venezuela e a circulação do vírus em 23 países, o que gera uma enorme preocupação da sua volta ao Brasil.",
              },
              {
                content: "Um cálculo do Ministério da Saúde aponta que em 2018, 312 cidades do Brasil estavam com menos de 50% das crianças vacinadas contra a doença, cenário propício para a volta da circulação do virus.",
              }
            ],
          },
          {
            image: "vacinas/cards/sick-men-in-bed.png",
            title: "CAXUMBA",
            timeline: [
              {
                content: "Por ser uma doença sazonal, ela nunca foi considerada eliminada no Brasil porém a vacinação pode controlar a sua incidência.",
              },
              {
                content: "Desde 2016, estados têm registrado surtos cada vez maiores da doença.",
              },
              {
                content: "A vacina contra o sarampo disponibilizada pelo governo é a mesma para a Caxubma e a Rubéola (Triplice Viral), por isso o aumento também da incidência dessas doenças no país. Em 2018 a cobertura vacinal para a primeira dose da vacina foi de 80% e para a segunda foi de apenas de 75%.",
              }
            ],
          },
          {
            image: "vacinas/cards/sick-woman-in-bed.png",
            title: "DIFTERIA",
            timeline: [
              {
                content: "O último caso confirmado de difteria foi registrado em 2009.",
              },
              {
                content: "Dados preliminares de 2018 mostram que apenas um Estado, o Ceará, apresentou uma cobertura vacinal aceitável, acima de 90%.",
              },
              {
                content: "A situação, por si só, já seria preocupante. Mas o cenário se agrava de forma expressiva quando se leva em consideração que países próximos enfrentam surtos da infecção.",
              }
            ],
          },
          {
            image: "vacinas/cards/sick-baby-red-dots-2.png",
            title: "RUBÉOLA",
            timeline: [
              {
                content: "Em 2015, o Brasil recebeu a certificação da eliminação da circulação do vírus da Rubéola e Síndrome da Rubéola Congênita.",
              },
              {
                content: "No entanto, em 2019, Argentina e Chile já apresentam casos confirmados da doença.",
              },
              {
                content: "Devido à baixa taxa vacinal da Triplice viral (Sarampo, Caxumba e Rubéola), a volta do virus é uma ameaça real, ainda mais com países próximos regristrando casos.",
              }
            ],
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

  .c-section-carousel-cards
      
  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)

</style>

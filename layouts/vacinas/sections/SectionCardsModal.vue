<template>
  <div class="c-section-cards-modal overflow-hidden">
    <div class="w-100 my-5 my-md-10 content-section">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <section class="col-lg-10 py-4">
            <h3 class="font-size-lg">
              A EVOLUÇÃO DAS <span class="lay-color-orange">EPIDEMIAS</span>
            </h3>
            <p class="lay-color-light-gray">
              Entre 2011 e 2018, a OMS acompanhou 1.483 eventos epidêmicos em 172 países. Doenças como Ebola, Zika, Sars e febre amarela se espalharam por vários países. A sociedade planetária sofre com as grandes epidemias há muito tempo. A peste bubônica assolou a Europa na Idade Média e a varíola dizimou milhões de indígenas nas Américas com a chegada dos europeus entre os séculos 15 e 16. Para o século 21, o alerta dos especialistas já tinha sido dado há muito tempo: <span class="lay-color-orange">mais cedo ou mais tarde, doenças novas poderiam se espalhar, rapidamente, entre todos os continentes.</span> O coronavírus, segundo os estudos, não será o único.
            </p>
          </section>
          <div class="col-lg-10 py-3">
            <CardsModal :cardsModalData="cardsModalData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CardsModal from "../CardsModal";

  export default {
    name: 'SectionCardsModal',
    components: {
      CardsModal,
    },
    data: function() {
      return {
        cardsModalData: [
          {
            title: "Como surge a pandemia",
            btn: "Descubra",
            modal: {
              image: "vacinas/cards-modal/map-disease.png",
              description: "O sucesso evolutivo de uns pode significar problemas para outros, como doenças e mortes. Na relação entre vírus e outros animais é sempre assim. Ao conseguir saltar dos animais silvestres para o ser humano e infectá-lo com sucesso, é como se este determinado vírus ganhasse em uma espécie de loteria evolutiva. No caso do coronavírus, foi exatamente o que ocorreu. Como ele nunca havia circulado entre os seres humanos, a memória imunológica das pessoas não conseguiu encontrar meios para se defender. A pandemia, ao contrário da epidemia, ocorre exatamente quando uma doença se espalha rapidamente por quase todos os cantos do planeta, como ocorreu no início de 2020.",
            },
          },
          {
            title: "Vírus e seres humanos têm relações antigas",
            btn: "Descubra",
            modal: {
              image: "vacinas/cards-modal/virus-01.png",
              description: "A biodiversidade da Terra é desconhecida. No Brasil, os cientistas conhecem por volta de 10% das espécies. Os microorganismos, onde estão os vírus, estão entre os grupos onde o desconhecimento é maior. Se desta vez uma grande pandemia sugiu no interior da China, nada impede que no futuro ela apareça na Amazônia. Há mais de 100 anos, em 1918, uma grande doença surgiu nos Estados Unidos, mas ficou conhecida como gripe espanhola porque foram os jornais espanhóis que divulgaram as milhares de mortes registradas pelo vírus influenza na guerra. Por volta de 50 milhões de pessoas, ou 5% da população mundial, perderam a vida.",
            },
          },
          {
            title: "Fábricas de vírus",
            btn: "Descubra",
            modal: {
              image: "vacinas/cards-modal/bat.png",
              description: "Nas últimas décadas, várias doenças ficaram associadas, e não sem razão, com alguns grupos de animais. Seja a AIDS com os macacos, os morcegos com o Ebola e, agora, os pangolins com o coronavírus. Muito além de apontar o dedo para este ou aquele país, e os seus mercados em condições de higiene insalubre, a grande causa da proliferação de focos de doença pelo mundo é o comércio e o consumo ilegal de animais silvestres. Cadeias de produção clandestinas que funcionam como fábricas de vírus. A ONU calcula que o tráfico de espécies protegidas movimenta a cada ano até US$ 10 bilhões.",
            },
          },
          {
            title: "Desmatamento antrópico prolifera doenças",
            btn: "Descubra",
            modal: {
              image: "vacinas/cards-modal/sad-florest.png",
              description: "A história da destruição dos ecossistemas pelo homem é antiga. No Brasil, a Mata Atlântica, desde a chegada dos portugueses até agora perdeu por volta de 85% da sua cobertura original. Uma exuberante floresta, que cobria áreas extensas desde Santa Catarina até o Piauí, quase sumiu do mapa. Com isso, milhões de espécies desapareceram. As que sobreviveram, entretanto, habitam agora áreas geográficas bem menores, o que faz com que o convívio de animais silvestres, vírus e seres humanos fique perigosamente mais íntimo. Ao se apoderar das florestas, o homem passa a correr cada vez mais riscos por ficar mais próximo de muitas doenças.",
            },
          },
          {
            title: "Aquecimento global altera mapa das epidemias",
            btn: "Descubra",
            modal: {
              image: "vacinas/cards-modal/iceberg.png",
              description: "O aumento das emissões de gases de efeito estufa desde o início da revolução industrial altera o clima do planeta sem precendentes. Eventos climáticos extremos, como chuvas mais torrenciais em um curto espaço de tempo em São Paulo ou grandes incêndios na Autrália, já fazem parte da realidade. Com essa reconfiguração causada pelas atividades antrópicas, vários grupos de vírus e de insetos, transmissores de doenças importantes para os seres humanos como dengue e febre amarela, entre outras, também vão sobreviver em locais onde antes eles não conseguiam. Desta forma, vários tipos de moléstias vão ganhar cada vez mais espaço sobre o planeta.",
            },
          },
          {
            title: "Aldeia global sob ameaça",
            btn: "Descubra",
            modal: {
              image: "vacinas/cards-modal/global-net.png",
              description: "No século 21, apesar de todas evidências apontadas pelos cientistas há décadas, os probemas ambientais que impactam à saúde pública se avolumam. Junta-se ao desmatamento, ao aquecimentos global e ao comércio ilegal de animais silvestres uma corrente que ignora os avanços relatados pelos historiadores científicos. Os movimentos antivacina e os adeptos de que a Terra é plana, mesmo considerando a importância da liberdade de expressão, aumentam os riscos ao planeta e a humanidade ao colocarem teorias científicas em xeque. Mesmo a ciência, dentro de sua evolução, ainda quebra a cabeça para resolver problemas antigos, como vacinas eficientes contra o HIV e a dengue. Outras ameaças ainda presentes.",
            },
          },
          {
            title: "A busca pela vacina da covid-19",
            btn: "Descubra",
            modal: {
              image: "vacinas/cards-modal/needle.png",
              description: "Por causa dos efeitos devastadores causado pelo coronavírus entre os humanos, várias equipes de dezenas de países estão tentando desenvolver uma vacina contra o vírus que seja eficiente e segura ao mesmo tempo. Processos que costumam demorar anos, por causa dos esforços da OMS e de vários governos federais podem ser abreviados. Mas não há garantia nenhuma que as pesquisas possam ter um bom resultado em um curto espaço de tempo. Países como Reino Unido, França, Alemanha e Itália, além de Estados Unidos e China estão na corrida. O Brasil também tem alguns projetos em curso em alguns laboratórios.",
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

  .c-section-cards-modal
      
  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)

</style>

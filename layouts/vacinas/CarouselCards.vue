<template>
  <div id="c-carousel-cards">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in carouselData" :key="index">
        <section class="w-100 h-100 rounded shadow-lg card-main-container lay-bg-darker pl-4 pr-4 pb-4 pt-10" :style="{ backgroundImage: 'url(' + require(`@/assets/images/${item.image}`) + ')' }">
          <h5 class="text-white mt-1 mt-md-5">
            {{ item.title }}
          </h5>
          <ul class="ul-timeline lay-color-light-gray small">
            <li v-for="(item, index) in item.timeline" :key="index">
              {{ item.content }}
            </li>
          </ul>
        </section>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
  import 'swiper/css/swiper.css';

  export default {
    name: 'CarouselCards',
    components: {
      Swiper,
      SwiperSlide
    },
    directives: {
      swiper: directive
    },
    props: {
      carouselData: Array,
    },
    data: function() {
      return {
        swiperOptions: {
          spaceBetween: 15,
          slidesPerView: 1,
          // Responsive breakpoints
          breakpoints: {
            // when window width is >= 640px
            900: {
              slidesPerView: 2,
              spaceBetween: 30,
            }
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    methods: {
      
    },
    mounted () {
      
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  #c-carousel-cards
    .swiper-container
      width: 100%
      overflow: visible !important
      .card-main-container
        background-position: center top 
        background-repeat: no-repeat
        background-size: contain
      .swiper-slide
        height: 100%
        opacity: .3
        transition: opacity .2s ease-out
        &.swiper-slide-active,
        &.swiper-slide-next
          opacity: 1
      .ul-timeline
        margin: 0
        padding: 0
        list-style: none
        li 
          position: relative
          padding-left: 25px
          &::before 
            display: block
            content: " "
            width: 1px
            height: 100%
            background-color: map-get($color-config, "orange")
            position: absolute
            left: 8px
            top: 5px
          &::after 
            display: block
            content: " "
            width: 16px
            height: 16px
            border-radius: 50%
            border: 1px solid map-get($color-config, "orange")
            background-color: map-get($color-config, "darker")
            position: absolute
            left: 0
            top: 1px
          &:not(:last-child)
            padding-bottom: 15px
          &:last-child::before 
            display: none


  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)
    #c-carousel-cards
      .swiper-container
        .swiper-slide
          opacity: .7
          &.swiper-slide-next
            opacity: .7
</style>

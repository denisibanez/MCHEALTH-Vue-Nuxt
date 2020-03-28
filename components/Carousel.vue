<template>
  <div class="c-carousel">
      <div class='slider'>
        <ul class="slider__wrapper" ref="refWrapper" style="wrapperTransform">
          <li 
            v-for="slide in slideData"
            :key="slide.index" 
            ref="refSlides"
            class="slide" 
            :class="getSlideClass(slide)" 
            v-on:mousemove="handleMouseMove($event, slide.index)"
            v-on:mouseleave="handleMouseLeave($event, slide.index)"
            v-on:click="handleClick(slide)"
            :style="{ '--x': x, '--y': y }">
            <div class="slide__image-wrapper">
              <img 
                class="slide__image"
                :src="require('@/assets/images/' + slide.imgName)"
              />
            </div>
            <article class="slide__content">
              <h2 class="slide__headline font-weight-bold">
                {{ slide.headline }}
              </h2>
              <p class="slide__description">
                {{ slide.description }}
              </p>
              <button class="slide__action btn btn-default-orange-button-arrow lay-color-black c-magnetic">
                <span>
                  {{ slide.button }}              
                </span>  
              </button>
            </article>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  import gsap from "gsap";
  import TweenLite from "gsap";
  import Draggable from "gsap/Draggable";

  if (process.client) {
    gsap.registerPlugin(Draggable, TweenLite);
  }

  export default {
    name: 'Carousel',
    props: {
      slideData: Array
    },
    data: function() {
      return  {
        current: 1,
        wrapperTransform: null,
        x: 0,
        y: 0,
        draggable: null
      }
    },
    methods: {
      handleMouseMove: function(event, index) {
        let ref = this.$refs.refSlides[index];

        if (index == this.current) {
          this.x = event.clientX - (ref.getBoundingClientRect().left + Math.floor(ref.clientWidth / 2));
          this.y = event.clientY - (ref.getBoundingClientRect().top + Math.floor(ref.clientHeight / 2));
        }
      },
      handleMouseLeave: function(event, index) {    
        this.x = 0;
        this.y = 0;
      },
      handleClick: function(slide) {
        if (slide.enabled === true) {
          if (slide.index == this.current) {
            console.log("LINK");
          } else if (slide.index < this.current) {
            this.current -= 1;
          } else if (slide.index > this.current) {
            this.current += 1;
          }
        }
      },
      controlGoTo: function (target) {
        let limit = this.slideData.length - 1;

        if (target === "next") {
          if (this.current === limit) {
            this.current = limit;
          } else {
            this.current += 1;
          }
        } else if (target === "prev") {
          if (this.current === 0) {
            this.current = 0;
          } else {
            this.current -= 1;
          }
        }
      },
      getSlideClass: function(slide) {
        let class1 = "";
        let class2 = "";
        if (slide.index == this.current) {
          class1 = "slide--current";
        } else if (slide.index < this.current) {
          class1 = "slide--previous";
        } else if (slide.index > this.current) {
          class1 = "slide--next";
        }

        if (slide.enabled != true) {
          class2 = "disabled";
        }

        return class1 + " " + class2;
      },
      setSliderPosition: function () {
        let width = this.$refs.refWrapper.clientWidth;
        let limit = this.slideData.length;

        TweenLite.set(".slider__wrapper", { x: percentToPixel(this.current, width, limit) } );
      
        function percentToPixel(current, width, limit) {
          return ((current * (width / limit)) * -1) + "px"
        }
      },
      controlSwipe: function() {
        let dir = this.draggable.getDirection("start");
        
        if (dir == "left") {
          this.controlGoTo("next");
        } else if (dir == "right") {
          this.controlGoTo("prev");
        };

        this.setSliderPosition();
      }
    }, 
    mounted() {
      this.setSliderPosition();

      this.draggable = Draggable.create(".slider__wrapper", { 
        type:"x", 
        edgeResistance: 0.65, 
        bounds: ".slider", 
        inertia: true,
        onDragEnd: this.controlSwipe
      })[0];
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~bootstrap/scss/mixins'

  $base-duration: 600ms
  $base-ease: cubic-bezier(0.25, 0.46, 0.45, 0.84)

  $slide-size-width: 70vmin
  $slide-size-height: calc(100vmin - 105px - 105px)
  $slide-size-height-xs: calc(90vh - 80px - 80px)
  $slide-margin: 4vmin

  .c-carousel
    position: absolute
    top: 0
    left: 0
    align-items: center
    display: flex
    height: 100%
    justify-content: center
    overflow: hidden
    width: 100%

  .slider
    height: $slide-size-height
    margin: 0 auto
    position: relative
    width: $slide-size-width
    *
      -webkit-touch-callout: none
      -webkit-user-select: none
      -khtml-user-select: none
      -moz-user-select: none
      -ms-user-select: none
      user-select: none

  .slider__wrapper
    display: flex
    margin: 0 ($slide-margin * -1)
    padding-left: 0
    position: absolute
    transition: transform $base-duration cubic-bezier(0.25, 1, 0.35, 1)
    z-index: initial !important
    cursor: auto !important

  .slide
    align-items: center
    color: white
    display: flex
    flex: 1
    flex-direction: column
    height: $slide-size-height
    justify-content: flex-end
    margin: 0 $slide-margin
    opacity: 0.25
    position: relative
    text-align: center
    transition: opacity ($base-duration / 2) $base-ease, transform ($base-duration / 2) $base-ease
    width: $slide-size-width
    z-index: 1

    &.disabled
      filter: grayscale(1) !important
      &:hover
        cursor: default !important
      .slide__action
        opacity: 0
        visibility: hidden

    &--previous,
    &--next
      .slide__image-wrapper
        filter: grayscale(1)
      
      .slide__description
        opacity: 0
        max-height: 0
        transform: translate(0px, 30px)

      &:hover
        opacity: 0.5
        .slide__image-wrapper
          filter: grayscale(0.8)

    &--previous
      cursor: w-resize
      &:hover
        transform: translateX(2%)

    &--next
      cursor: e-resize
      &:hover
        transform: translateX(-2%)

  .slide--current
    --x: 0
    --y: 0
    --d: 50
    opacity: 1
    pointer-events: auto
    user-select: auto
    .slide__image-wrapper::before
      opacity: 1

    @media (hover: hover)
      &:hover .slide__image-wrapper
        transform: scale(1.025) translate(calc(var(--x) / var(--d) * 1px), calc(var(--y) / var(--d) * 1px))

  .slide__image-wrapper
    background-color: #161515
    height: 100%
    left: 0%
    border-radius: 2%
    overflow: hidden
    position: absolute
    top: 0%
    transition: transform ($base-duration / 4) $base-ease
    width: 100%
    &::before
      display: block
      content: " "
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 80%
      z-index: 5
      opacity: .5
      transition: opacity ($base-duration / 2) $base-ease
      background: linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(10,10,10,1) 15%, rgba(10,10,10,0) 100%)

  .slide__image
    --d: 20
    height: 110%
    left: -5%
    object-fit: cover
    pointer-events: none
    position: absolute
    top: -5%
    transition: opacity $base-duration $base-ease, transform $base-duration $base-ease
    user-select: none
    width: 110%
    max-width: 110%
    @media (hover: hover)
      .slide--current &
        transform: translate(calc(var(--x) / var(--d) * 1px), calc(var(--y) / var(--d) * 1px))

  .slide__headline
    font-size: 8vmin
    font-weight: 600
    position: relative

  .slide__description
    transition: all ($base-duration / 1.5) $base-ease
    max-height: 150px
    opacity: 1
    transform: translate(0px, 0px)

  .slide__content
    --d: 40
    padding: 5vmin 7vmin
    position: relative
    z-index: 10
    transition: transform $base-duration $base-ease
    .slide--current &
      animation: fadeIn ($base-duration / 2) $base-ease forwards
      @media (hover: hover)
        transform: translate(calc(var(--x) / var(--d) * -1px), calc(var(--y) / var(--d) * -1px))

  @keyframes fadeIn
    from
      opacity: 0
    to
      opacity: 1

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)

  @include media-breakpoint-down(xs)
    .slide,
    .slider
      height: $slide-size-height-xs
      width: 80vmin

    .slide__image-wrapper::before
        height: 130%
</style>

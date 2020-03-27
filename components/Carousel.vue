<template>
  <div class="c-carousel">
      <div class='slider'>
        <ul class="slider__wrapper" :style="wrapperTransform">
          <li 
            v-for="slide in slideData"
            :key="slide.index" 
            ref="refSlides"
            class="slide" 
            :class="getSlideClass(slide.index)" 
            v-on:mousemove="handleMouseMove($event, slide.index)"
            v-on:mouseleave="handleMouseLeave($event, slide.index)"
            :style="{ '--x': x, '--y': y }">
            <div class="slide__image-wrapper">
              <img 
                class="slide__image"
                :src="require('@/assets/images/' + slide.imgName)"
              />
            </div>
            
            <article class="slide__content">
              <h2 class="slide__headline">
                {{ slide.headline }}
              </h2>
              <p class="slide__description">
                {{ slide.description }}
              </p>
              <button class="slide__action btn">
                {{ slide.button }}              
              </button>
            </article>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
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
      getSlideClass: function(index) {
        if (index == this.current) {
          return 'slide--current';
        } else if (index < this.current) {
          return 'slide--previous';
        } else if (index > this.current) {
          return 'slide--next';
        }
      }
    }, 
    mounted() {
      this.wrapperTransform = {
        // 'transform': `translateX(-${this.current * (100 / this.slideData.length)}%)`
        'transform': `translateX(-${this.current * (100 / 3)}%)`
      };
    }
  }
</script>

<style lang="scss" scoped>
  
  $base-duration: 600ms;
  $base-ease: cubic-bezier(0.25, 0.46, 0.45, 0.84);

  $slide-size-width: 80vmin;
  $slide-size-height: calc(100vmin - 105px - 105px);
  $slide-margin: 4vmin;

  .c-carousel {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    overflow-x: hidden;
    width: 100%;
    margin: 15px 0;
  }
  .slider {
    height: $slide-size-height;
    margin: 0 auto;
    position: relative;
    width: $slide-size-width;
  }
  .slider__wrapper {
    display: flex;
    margin: 0 calc($slide-margin * -1);
    position: absolute;
    transition: transform 600ms cubic-bezier(0.25, 1, 0.35, 1);
  }
  .slide {
    align-items: center;
    border-radius: 2%;
    overflow: hidden;
    color: white;
    display: flex;
    flex: 1;
    flex-direction: column;
    height: $slide-size-height;
    justify-content: flex-end;
    margin: 0 $slide-margin;
    opacity: 0.25;
    position: relative;
    text-align: center;
    transition: 
      opacity calc(600ms / 2) cubic-bezier(0.25, 0.46, 0.45, 0.84),
      transform calc(600ms / 2) cubic-bezier(0.25, 0.46, 0.45, 0.84);
    width: $slide-size-width;
    z-index: 1;
    
    &--previous,
    &--next {    
      .slide__image-wrapper {
        filter: grayscale(1);
      }

      &:hover {
        opacity: 0.5;
        .slide__image-wrapper {
          filter: grayscale(.8);
        }
      }
    }
    &--previous {
      cursor: w-resize;
      
      &:hover {
        transform: translateX(2%);
      }
    }
    &--next {
      cursor: e-resize;
      
      &:hover {
        transform: translateX(-2%);
      }
    }
  }

  .slide--current {
    --x: 0;
    --y: 0;
    --d: 50;

    opacity: 1;
    pointer-events: auto;
    user-select: auto;

    @media (hover: hover) {
      &:hover .slide__image-wrapper {
        transform: 
          scale(1.025)
          translate(
            calc(var(--x) / var(--d) * 1px),
            calc(var(--y) / var(--d) * 1px)
          );
      }    
    }
  }
  .slide__image-wrapper {
    background-color: #000;
    height: 100%;
    left: 0%;
    overflow: hidden;
    position: absolute;
    top: 0%;  
    transition: transform calc(600ms / 4) cubic-bezier(0.25, 0.46, 0.45, 0.84);
    width: 100%;
  }
  .slide__image {
    --d: 20;

    height: 110%;
    left: -5%;
    object-fit: cover;
    pointer-events: none;
    position: absolute;
    top: -5%;
    transition:
      opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.84),
      transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.84);
    user-select: none;
    width: 110%;
    max-width: 110%;
    
    @media (hover: hover) {
      .slide--current & {      
        transform: 
          translate(
            calc(var(--x) / var(--d) * 1px),
            calc(var(--y) / var(--d) * 1px)
          ); 
      }
    }
  }
  .slide__headline {
    font-size: 8vmin;
    font-weight: 600;
    position: relative;
  }
  .slide__content {
    --d: 60;
  
    opacity: 0;
    padding: 4vmin;
    position: relative;
    transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.84);
    visibility: hidden;
    .slide--current & {
      animation: fadeIn calc(600ms / 2) cubic-bezier(0.25, 0.46, 0.45, 0.84) forwards;
      visibility: visible;

      @media (hover: hover) {
        transform: 
          translate(
            calc(var(--x) / var(--d) * -1px),
            calc(var(--y) / var(--d) * -1px)
          );
      }
    }
  }

  @keyframes fadeIn {
    from { opacity: 0 }
    to   { opacity: 1 }
  }
</style>

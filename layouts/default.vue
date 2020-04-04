<template>
  <div id="page">
    <div class="c-cursor">
      <div class="c-cursor__pointer"><div class="point"></div></div>
      <div class="c-cursor__pointer__dot"><div class="point"></div></div>
    </div>
    <Header msg="A VERDADEIRA DOENÇA É A DESINFORMAÇÃO." />
    <nuxt />
  </div>
</template>

<script>
  import Header from "./partials/Header";

  import gsap from "gsap";
  import TweenMax from "gsap";
  import TweenLite from "gsap";
  import Power2 from "gsap";
  import Power4 from "gsap";
  
  if (process.client) {
    gsap.registerPlugin(TweenMax, TweenLite, Power2, Power4); 
  }

  export default {
    components: {
      Header,
    },
    data: function() {
      return {
        mouseCursor: null,
        magneticCursor: null,
      }
    },
    methods: {

    },
    mounted() {
      // Custom Cursor
      class MouseCursor {
        constructor() {
          this.page = document.querySelector('#page');

          const cursor = document.querySelector('.c-cursor__pointer');
          const cursor_dot = document.querySelector('.c-cursor__pointer__dot');

          TweenLite.to([cursor, cursor_dot], {
            autoAlpha: 0,
          });
        }

        moveMousePos(e) {
          const mousePosX = e.clientX;
          const mousePosY = e.clientY;
          const cursor = document.querySelector('.c-cursor__pointer');
          const cursor_dot = document.querySelector('.c-cursor__pointer__dot');
          
          if (e.target.classList.contains('c-magnetic')) return;

          TweenLite.to([cursor, cursor_dot], 0.3, {
            x: mousePosX,
            y: mousePosY,
            ease: Power4.easeOut,
          });
        }

        enterMouse() {
          const cursor = document.querySelector('.c-cursor__pointer');
          const cursor_dot = document.querySelector('.c-cursor__pointer__dot');

          TweenLite.to([cursor, cursor_dot], {
            autoAlpha: 1,
            ease: Power4.easeOut,
          });
        }

        handleMousePos() {
          this.page.addEventListener('mouseenter', this.enterMouse);
          this.page.addEventListener('mousemove', this.moveMousePos, false);
        }

        updateOnHover(e) {
          const { tagName, classList } = e.target;

          if (tagName === 'LABEL' ||
            tagName === 'A' ||
            tagName === 'BUTTON' ||
            classList.contains('is-cursor-hover') ||
            (e.target.parentElement.tagName === 'A' && e.target.tagName === 'IMG')
          ) {
            document.querySelector('html').classList.add('is-hover');
          } else {
            document.querySelector('html').classList.remove('is-hover')
          }
        }

        handleLinkHover() {
          this.page.addEventListener('mouseover', this.updateOnHover.bind(this));
          this.page.addEventListener('mouseout', this.updateOnHover.bind(this));
        }

        render() {
          this.handleMousePos();
          this.handleLinkHover();
          this.enterMouse()
        }
      }

      class MagneticCursor {
        constructor() {
          this.links = [...document.querySelectorAll('.c-magnetic')];
          this.cursor = document.querySelector('.c-cursor__pointer');
          this.cursor_dot = document.querySelector('.c-cursor__pointer__dot');
          this.pos = { x: 0, y: 0 };
        }
        
        activateMagnetic() {
          this.links.map(link => {
            const that = this;
            link.addEventListener('mousemove', function(e) {
              that.moveTarget(e, this, this, 30);
              that.moveCursor(e, this, 1.5);
            });
            
            link.addEventListener('mouseout', function() {
              TweenMax.to(this, 0.3, {
                x: 0,
                y: 0
              });
            });
          });
        }
        
        moveCursor(e, link, force) {
          var rect = link.getBoundingClientRect();
          var relX = e.pageX - rect.left;
          var relY = e.pageY - rect.top;
          this.pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / force;
          this.pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / force;

          TweenMax.to([this.cursor, this.cursor_dot], 0.3, {
            x: this.pos.x,
            y: this.pos.y
          });
        }
        
        moveTarget(e, link, span, force) {
          var boundingRect = link.getBoundingClientRect();
          var relX = e.pageX - boundingRect.left;
          var relY = e.pageY - boundingRect.top;

          TweenMax.to(span, 0.3, {
            x: (relX - boundingRect.width / 2) / boundingRect.width * force,
            y: (relY - boundingRect.height / 2) / boundingRect.height * force,
            ease: Power2.easeOut
          });
        }
        
        render() {
          this.activateMagnetic();
        }
      }

      this.mouseCursor = new MouseCursor();
      this.magneticCursor = new MagneticCursor();
      
      this.mouseCursor.render();
      this.magneticCursor.render();
    },
    watch: {
      $route () {
        this.mouseCursor.render();
        this.magneticCursor.render();
      }
    },
  }
</script>

<style lang="sass">
  @import "../assets/sass/global.sass"
</style>

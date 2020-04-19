<template>
  <div class="c-cursor">
    <div class="c-cursor__pointer"><div class="point"></div></div>
    <div class="c-cursor__pointer__dot"><div class="point"></div></div>
  </div>
</template>

<script>
  import gsap from "gsap";
  import TweenMax from "gsap";
  import TweenLite from "gsap";
  import Power2 from "gsap";
  import Power4 from "gsap";
  
  if (process.client) {
    gsap.registerPlugin(TweenMax, TweenLite, Power2, Power4); 
  }

  export default {
    name: 'CustomCursor',
    data: function() {
      return {
        mouseCursor: null,
        magneticCursor: null,
        helpers: {
          page: null,
          cursor: null,
          cursor_dot: null,
          mousePosX: null,
          mousePosY: null,
          links: null,
          pos: {
            x: 0,
            y: 0,
          },
          listenerMouseMove: null,
          listenerMouseOut: null,
        },
      }
    },
    methods: {
      // Cursor Functions
      mouseCursorConstructor: function () {
        this.helpers.page = document.querySelector('#page');
        this.helpers.cursor = document.querySelector('.c-cursor__pointer');
        this.helpers.cursor_dot = document.querySelector('.c-cursor__pointer__dot');

        TweenLite.to([this.helpers.cursor, this.helpers.cursor_dot], {
          autoAlpha: 0,
        });
      },
      mouseCursorMove: function (event) {
        this.helpers.mousePosX = event.clientX;
        this.helpers.mousePosY = event.clientY;
        
        if (event.target.classList.contains('c-magnetic')) return;

        TweenLite.to(this.helpers.cursor, 0.3, { x: this.helpers.mousePosX, y: this.helpers.mousePosY, ease: Power4.easeOut });
        TweenLite.to(this.helpers.cursor_dot, 0.1, { x: this.helpers.mousePosX, y: this.helpers.mousePosY });

        document.querySelector('html').classList.remove('hide-cursor');
      },
      mouseCursorEnter: function () {
        TweenLite.to([this.helpers.cursor, this.helpers.cursor_dot], { autoAlpha: 1, ease: Power4.easeOut });
      },
      mouseCursorHandleMousePos: function () {
        this.helpers.page.addEventListener('mouseenter', this.mouseCursorEnter);
        this.helpers.page.addEventListener('mousemove', this.mouseCursorMove, false);
      },
      mouseCursorUpdateOnHover: function (event) {
        const { tagName, classList } = event.target;

        if (tagName === 'LABEL' ||
          tagName === 'A' ||
          tagName === 'BUTTON' ||
          classList.contains('is-cursor-hover') ||
          (event.target.parentElement.tagName === 'A' && tagName === 'IMG')) {
          document.querySelector('html').classList.add('is-hover');
        } else {
          document.querySelector('html').classList.remove('is-hover')
        }
      },
      mouseCursorUpdateOnOut: function (event) {
        document.querySelector('html').classList.add('hide-cursor');
      },
      mouseCursorHandleLinkHover: function() {
        this.helpers.page.addEventListener('mouseover', this.mouseCursorUpdateOnHover);
        this.helpers.page.addEventListener('mouseout', this.mouseCursorUpdateOnOut);
      },
      mouseCursorRender: function () {
        document.querySelector('html').classList.add('hide-cursor');

        this.mouseCursorHandleMousePos();
        this.mouseCursorHandleLinkHover();
        this.mouseCursorEnter();
      },
      // Magnetic Cursor Functions
      magneticCursorConstructor: function () {
        this.helpers.links = [...document.querySelectorAll('.c-magnetic')];

        this.helpers.listenerMouseOut = function (event) {
          TweenMax.to(this, 0.3, {
            x: 0,
            y: 0,
          });
        }

        let that = this;
        this.helpers.listenerMouseMove = function (event) {
          that.magneticCursorMoveTarget(event, this, this, 30);
          that.magneticCursorMoveCursor(event, this, 1.5);
        }
      },
      magneticCursorActivate: function () {
        this.helpers.links.map(link => {
          link.addEventListener('mousemove', this.helpers.listenerMouseMove);
          link.addEventListener('mouseout', this.helpers.listenerMouseOut);
        });
      },
      magneticCursorMoveCursor: function (event, link, force) {
        let rect = link.getBoundingClientRect();
        let relX = event.pageX - rect.left;
        let relY = event.pageY - rect.top;

        this.helpers.pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / force;
        this.helpers.pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / force;

        TweenMax.to([this.helpers.cursor, this.helpers.cursor_dot], 0.3, { x: this.helpers.pos.x, y: this.helpers.pos.y });
      },
      magneticCursorMoveTarget: function (event, link, span, force) {
        let boundingRect = link.getBoundingClientRect();
        let relX = event.pageX - boundingRect.left;
        let relY = event.pageY - boundingRect.top;

        TweenMax.to(span, 0.3, {
          x: (relX - boundingRect.width / 2) / boundingRect.width * force,
          y: (relY - boundingRect.height / 2) / boundingRect.height * force,
          ease: Power2.easeOut
        });
      },
      magneticCursorRender: function () {
        this.magneticCursorActivate();
      },
      // Helpers
      isMobile: function () {
        const ua = window.navigator.userAgent;

        if (ua.indexOf('iPad') > -1) {
            return true;
        }
        if (ua.indexOf('Macintosh') > -1) {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {}
        }

        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
            /android/i,
            /ipad/i,
            /playbook/i,
            /silk/i,
        ];

        return toMatch.some((toMatchItem) => {
            return ua.match(toMatchItem);
        });
      },
    },
    mounted() {
      if (!this.isMobile()) {
        this.mouseCursorConstructor();
        this.mouseCursorRender();

        this.magneticCursorConstructor();
        this.magneticCursorRender();

        this.$root.$on('updateCursorListeners', () => {
          this.helpers.links.map(link => {
            link.removeEventListener('mousemove', this.helpers.listenerMouseMove);
            link.removeEventListener('mouseout', this.helpers.listenerMouseOut);
          });

          this.mouseCursorConstructor();
          this.mouseCursorRender();

          this.magneticCursorConstructor();
          this.magneticCursorRender();
        });
      }
    },
  }
</script>

<style lang="sass" scoped>
</style>

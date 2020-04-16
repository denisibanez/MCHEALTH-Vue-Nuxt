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
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
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

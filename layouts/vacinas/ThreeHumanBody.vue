<template>
  <div class="c-three-human-body">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

  export default {
    name: 'ThreeHumanBody',
    props: {
      width: Number,
      height: Number,
    },
    data: function() {
      return {
        renderer: null,
        camera: null,
        controls: null,
        obj: null,
        scene: null,
        loader: null,
      }
    },
    methods: {
      init: function () {
        this.loader = new OBJLoader();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(54, this.width / this.height, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: document.getElementById("canvas"),
        });

        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(new THREE.Color(0x0d0f0f));

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enabled = false;
        
        this.camera.position.x = 2.5;
        this.camera.position.y = 0;
        this.camera.position.z = -3.5;
        
        this.camera.lookAt(0, 0, 0)

        // Spotlight shining from the side, casting a shadow
        let spotLight = new THREE.SpotLight(0x0d0f0f, 2.5, 25, Math.PI / 6);
        spotLight.position.set(9, 10, 1);
        this.scene.add(spotLight);

        // let gridHelper = new THREE.GridHelper(4, 4);
        // this.scene.add(gridHelper);

        let that = this;

        // Load a resource
        this.loader.load(
          // Resource URL
          '/humanbody.obj',
          function (object) { // Called when resource is loaded
            object.scale.x = .3;
            object.scale.z = .3;
            object.scale.y = .3;

            object.position.x = 0;
            object.position.y = -4.5;
            object.position.z = 0;

            object.children[0].material.color.setHex(0x0d0f0f);

            var geometry = new THREE.EdgesGeometry(object.children[0].geometry, 2);
            var wirematerial = new THREE.LineBasicMaterial({color: 0xB2B2B2, linewidth: 2});
            var wireframe = new THREE.LineSegments(geometry, wirematerial);

            object.add(wireframe);

            that.scene.add(object);
            that.obj = object;
          },
          function (xhr) { // Called when loading is in progresses
            // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
          },
          function (error) { // Called when loading has errors
            console.log( 'An error happened' );
          }
        );

        this.animate();

        function updateCamera(e) {
          const mousePosX = e.clientX;
          const mousePosY = e.clientY;

          that.camera.position.x = 1.5 + (mousePosX / 800);
          that.camera.position.y = 0 + (mousePosY / 1000);
          
          that.camera.lookAt(0, 0, 0)
        }

        window.addEventListener("mousemove", updateCamera);
      },
      updateObjRotation: function() {
        if (this.obj) {
          this.obj.rotation.y += (0.2*(Math.PI / 180));
          this.obj.rotation.y %= 360;
        }
      },
      resizeCanvas: function () {
        // this.camera = new THREE.PerspectiveCamera(54, this.width / this.height, 0.1, 1000);
        // this.renderer.setSize(this.width, this.height);
        // this.renderer.setClearColor(new THREE.Color(0x0d0f0f));
      },
      animate: function() {
        requestAnimationFrame(this.animate);
        if (this.obj) {
          this.updateObjRotation();
          this.renderer.render(this.scene, this.camera);
        }
      }
    },
    mounted() {
      this.init();
    },
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  @include media-breakpoint-down(lg)

  @include media-breakpoint-down(md)

  @include media-breakpoint-down(sm)
    #canvas
      margin-left: -200px
  @include media-breakpoint-down(xs)

</style>

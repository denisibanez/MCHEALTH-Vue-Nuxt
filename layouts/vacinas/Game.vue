<template>
  <div class="c-game shadow-lg rounded overflow-hidden" :style="{width: width + 'px'}">
    <div id="game-header" class="px-3 px-md-5 py-3 py-md-4">
      <div class="row justify-content-center align-items-center no-gutters">
        <div class="col-6 pr-0">
          <h4 class="game-font-timer font-weight-normal lay-color-light-gray d-flex align-items-center">
            <span class="game-clock mr-1" :class="'gm-'+status"><span></span></span>
            <span>
              {{ getRemainingTimeDisplay() }}
            </span>
          </h4>
          <button id="game-btn-pause" :class="['gm-'+status, status !== 'playing' ? 'disabled': '']" @click="pauseGame()">
            Pause
          </button>
          <button id="game-btn-sound" :class="['gm-sound-'+soundStatus, 'gm-'+status]" @click="switchSound()">
            Som
          </button>
        </div>
        <div class="col-6 pl-3 box-scoreboard lay-color-light-gray">
          <p class="mb-1 small d-flex align-items-center">
            <img class="icon-face mr-1" src="~/assets/images/vacinas/game-face-imune.svg" alt="Imunizados"> 
            <span class="game-border-dotted-yellow">Imunizados:</span> 
            <b class="game-color-yellow w-100 score-percent text-right game-border-dotted-yellow">{{score.imune}}%</b>
          </p>
          <p class="mb-1 small d-flex align-items-center">
            <img class="icon-face mr-1" src="~/assets/images/vacinas/game-face-healthy.svg" alt="Neutro"> 
            <span class="game-border-dotted-blue">Neutro:</span> 
            <b class="game-color-blue w-100 score-percent text-right game-border-dotted-blue">{{score.healthy}}%</b>
          </p>
          <p class="mb-0 small d-flex align-items-center">
            <img class="icon-face mr-1" src="~/assets/images/vacinas/game-face-sick.svg" alt="Doentes"> 
            <span class="game-border-dotted-red">Doentes:</span> 
            <b class="game-color-red w-100 score-percent text-right game-border-dotted-red">{{score.sick}}%</b>
          </p>
        </div> 
      </div>
    </div>
    <div class="game-content" :style="{width: this.width + 'px', height: this.height + 'px'}">
      <div id="game-overlay-initial" class="w-100 h-100" :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/game-background.jpg') + ')' }" ref="refOverlayInitial">
        <div class="row no-gutters w-100 h-100 align-items-center justify-content-center">
          <div class="col-md-7 col-8 text-center pb-5">
            <button class="btn btn-default-orange-button-arrow lay-color-black c-magnetic mb-3 w-100" @click="playGame()">
              Começar jogo
            </button>
            <br>
            <button class="btn btn-border-darker-orange lay-color-black w-100">
              Como jogar?
            </button>            
          </div>
        </div>
      </div>
      <div id="game-overlay-pause" class="w-100 h-100" :style="{ backgroundImage: 'url(' + require('@/assets/images/vacinas/game-background.jpg') + ')' }" ref="refOverlayPause">
        <div class="row no-gutters w-100 h-100 align-items-center justify-content-center">
          <div class="col-md-7 col-8 text-center pb-5">
            <button class="btn btn-default-orange-button-arrow lay-color-black c-magnetic mb-3 w-100" @click="playGame()">
              Continuar jogo
            </button>
            <br>
            <button class="btn btn-border-darker-orange w-100" @click="restartGame()">
              <span class="icomoon-reload"></span> Começar novamente
            </button> 
          </div>
        </div>
      </div>
      <div id="game-overlay-end" class="w-100 h-100" ref="refOverlayEnd">
        <div class="row no-gutters w-100 h-100 align-items-center justify-content-center">
          <section class="col-9" v-if="score.imune >= 95">
            <h2 class="lay-color-orange mb-2">
              <span>Parabéns, você conseguiu!</span>
            </h2>
            <p class="mb-3">Você imunizou <strong class="lay-color-orange">{{score.imune}}%</strong> da população.</p>
            <p class="lay-color-light-gray">
              Para uma doênça ser considerada <strong class="lay-color-orange">erradicada</strong>, pelo menos <strong class="lay-color-orange">95%</strong> da população precisa estar <strong class="lay-color-orange">imunizada</strong> à ela!
            </p>
            <p class="lay-color-light-gray">
              Compartilhe
            </p>
            <social-sharing url="https://vuejs.org/"
              title="The Progressive JavaScript Framework"
              description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
              quote="Vue is a progressive framework for building user interfaces."
              hashtags="vuejs,javascript,framework"
              twitter-user="vuejs"
              inline-template
              class="mb-3">
              <div>
              <network network="facebook">
                <span class="icomoon-facebook lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
              </network>
              <network network="linkedin">
                <span class="icomoon-linkedin lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
              </network>
              <network network="whatsapp">
                <span class="icomoon-whatsapp lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
              </network>
              <network network="twitter">
                <span class="icomoon-twitter lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
              </network>
              <network network="email">
                <span class="icomoon-letter lay-color-light-gray h4 mr-2 is-cursor-hover"></span>
              </network>
              </div>
            </social-sharing>
            <a href="#" @click="restartGame()" class="lay-color-light-gray text-decoration-none">
              <span class="icomoon-reload"></span> Jogar novamente
            </a>
          </section>
          <section class="col-9" v-else>
            <h2 class="game-color-red mb-2 d-flex align-items-center">
              <!-- <img class="icon-face-md mr-1" src="~/assets/images/vacinas/game-face-sick.svg" alt="Doentes">  -->
              <span>Sinto muito...</span>
            </h2>
            <p class="mb-3">Você imunizou somente <strong class="lay-color-orange">{{score.imune}}%</strong> da população.</p>
            <p class="lay-color-light-gray">
              Lembre-se, para uma doênça ser considerada <strong class="lay-color-orange">erradicada</strong>, pelo menos <strong class="lay-color-orange">95%</strong> da população precisa estar <strong class="lay-color-orange">imunizada</strong> à ela.
            </p>
            <a href="#" @click="restartGame()" class="lay-color-light-gray text-decoration-none">
              <span class="icomoon-reload"></span> Tentar novamente
            </a>
          </section>
        </div>
      </div>
      <canvas id="c-game-canvas" :style="{width: this.width + 'px', height: this.height + 'px'}" ref="refCanvas"></canvas>
    </div>
  </div>
</template>

<script>
  import gsap from "gsap";
  import TweenLite from "gsap";
  import Person from "~/utils/GamePerson";
  var SocialSharing = require('vue-social-sharing');
  import { Howl } from 'howler';

  if (process.client) {
    gsap.registerPlugin(TweenLite);
  }

  export default {
    name: 'Game',
    components: {
      SocialSharing,
    },
    data: function() {
      return {
        config: {
          pausedTime: 0,        // Store paused timer to be added on continue game
          timer: 30,            // (seconds) Max. time to complete the game
          field: {
            x: 6,               // Number of columns
            y: 9,               // Number of rows
          },
          infection: {
            initInfected: 2,    // Amount of infected people initially
            velocity: {         // Amount o frames to spread | 24 = 1s
              axes: {         
                min: 72,        // 3s
                max: 120,       // 5s
              },
              diag:  {
                min: 120,       // 5s
                max: 168,       // 7s
              },
            }, 
            chance: 75          // (Percent) Chance of spreading to each person
          },
          personRadius: 15,     // Radius on each person on field
          clickRadius: 15,      // Radius reacheable to immunize population
          debug: false,         // Debug mode (enable hack and show FPS)
          framerate: {          // Vars needed to FPS and Timer counters
            frameCount: 0,
            fpsInterval: 0, 
            startTime: 0, 
            now: 0, 
            then: 0, 
            elapsed: 0,
          },
        },
        score: {                // Variables needed for score counter
          healthy: 0,
          imune: 0,
          sick: 0,
        },
        status: 'not-started',  // Game status: 'not-started', 'paused', 'playing' or 'ended'
        soundStatus: 'off',     // Sound status: 'on' or 'off'
        sounds: {               // Vars needed for sounds effects
          tap: null,
          win: null,
          lose: null,
          bg: null,
        },
        centersArray: [],       // Position of each person on population
        population: [],         // Population array
        canvas: null,           // HTML canvas element
        ctx: null,              // CTX from canvas
        xDistance: 0,           // X distange between people on population 
        yDistance: 0,           // Y distange between people on population
        width: 400,             // Canvas width
        height: 570,            // Canvas height
      }
    },
    methods: {
      init: function() { // Initiate all dependencies for game (executed only once)
        // Default canvas variavles
        this.canvas = document.getElementById('c-game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set actual dimentions in memory (scaled to account for extra pixel density)
        let scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas
        this.canvas.width = this.width * scale;
        this.canvas.height = this.height * scale;

        // Normalize coordinate system to use css pixels
        this.ctx.scale(scale, scale);

        // Paint canvas
        this.canvas.style.backgroundColor = "#2E3337";

        // Calc X and Y distances for population
        this.xDistance = Math.trunc(this.width / (this.config.field.x + 1));
        this.yDistance = Math.trunc(this.height / (this.config.field.y + 1));

        // Instanciate sounds effects
        this.sounds.tap = new Howl({ src: ['/sounds/vacinas/game-tap.mp3'] });
        this.sounds.win = new Howl({ src: ['/sounds/vacinas/game-win.mp3'] });
        this.sounds.lose = new Howl({ src: ['/sounds/vacinas/game-lose.mp3'] });
        this.sounds.bg = new Howl({ src: ['/sounds/vacinas/game-background.mp3'],loop: true, volume: 0.3 });

        // Intanciate population
        this.initGame();

        // Add listeners on canvas
        this.canvas.addEventListener('click', this.click);
        if (this.config.debug) { // Enable hack on debug mode
          let clicked = false;
          let downListener = (event) => { clicked = true; };
          let moveListener = (event) => { if (clicked) { this.click(event); } };
          let upListener = (event) => { clicked = false; };
          this.canvas.addEventListener('mousedown', downListener);
          this.canvas.addEventListener('mousemove', moveListener);
          this.canvas.addEventListener('mouseup', upListener);
        }
      },
      cleanScore: function() { // Reset score to initial values
        this.score.imune = 0; 
        this.score.healthy = 97; 
        this.score.sick = 3; 
      },
      initGame: function () { // Intanciate population
        // Clean old values if exists
        this.centersArray = [];
        this.population = [];

        // Calc people`s centers array
        for (let xCurrent = 0, x = 1; x <= this.config.field.x; x++) {
          xCurrent += this.xDistance;
          
          for (let yCurrent = 0, y = 1; y <= this.config.field.y; y++) {
            yCurrent += this.yDistance;
            this.centersArray.push({
              x: xCurrent,
              y: yCurrent,
            });
          }
        }
        
        // Reset score to initial values
        this.cleanScore();
        
        // Set ramdomly initial infected people
        let infected = [];
        let infectedPosition = [];
        let allowedPosition = []
        for (let i = 1; i <= this.config.field.x * this.config.field.y; i++) {
          if (
            !(i % this.config.field.y === 1) && // First Row
            !(i % this.config.field.y === 0) && // Last Row
            !(i <= this.config.field.y) && // First Column
            !(i >= (this.config.field.x * this.config.field.y) - (this.config.field.y - 1)) // Last Collum
          ) {
            allowedPosition.push(i);
          } else {
            allowedPosition.push(i);
          }
        }
        for (let i = 0; i < this.config.infection.initInfected; i++) {
          infectedPosition.push(this.randomIntFromRange(0, allowedPosition.length - 1, infectedPosition));
          infected.push(allowedPosition[infectedPosition[i]]);
        }

        // Dependencies for instanciate Person class
        let counter = 1;
        let distances = {
          x: this.xDistance,
          y: this.yDistance,
        }        
        let disease = {};

        // Instanciate each Person and add to Population array
        this.centersArray.forEach(center => {
          let status = 1; // Init status: 1 = healthy; 2 = Immune; 3 = Infected

          // Randomly choose what directions will spread disease 
          let diseaseArms = {
            top:          { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            right:        { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            bottom:       { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            left:         { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            topRight:     { enabled: Math.random() >= 0.5, infected: false, },
            bottomRight:  { enabled: Math.random() >= 0.5, infected: false, },
            bottomLeft:   { enabled: Math.random() >= 0.5, infected: false, },
            topLeft:      { enabled: Math.random() >= 0.5, infected: false, },
          };

          // Randomly choose velocity to spread
          disease = {
            top:          this.randomIntFromRange(this.config.infection.velocity.axes.min, this.config.infection.velocity.axes.max),
            right:        this.randomIntFromRange(this.config.infection.velocity.axes.min, this.config.infection.velocity.axes.max),
            bottom:       this.randomIntFromRange(this.config.infection.velocity.axes.min, this.config.infection.velocity.axes.max),
            left:         this.randomIntFromRange(this.config.infection.velocity.axes.min, this.config.infection.velocity.axes.max),
            topRight:     this.randomIntFromRange(this.config.infection.velocity.diag.min, this.config.infection.velocity.diag.max),
            bottomRight:  this.randomIntFromRange(this.config.infection.velocity.diag.min, this.config.infection.velocity.diag.max),
            bottomLeft:   this.randomIntFromRange(this.config.infection.velocity.diag.min, this.config.infection.velocity.diag.max),
            topLeft:      this.randomIntFromRange(this.config.infection.velocity.diag.min, this.config.infection.velocity.diag.max),
          };

          // Infect person if was previously choosed
          if (infected.includes(counter)) {
            status = 3; 
            diseaseArms.top.enabled = true;
            disease.top = this.config.infection.velocity.axes.min;
          }

          // Disabled disease arms for out of the field
          if (counter % this.config.field.y === 1) { // First row
            diseaseArms.top.enabled = false;
            diseaseArms.topRight.enabled = false;
            diseaseArms.topLeft.enabled = false;
          }
          if (counter % this.config.field.y === 0) { // Last row
            diseaseArms.bottom.enabled = false;
            diseaseArms.bottomLeft.enabled = false;
            diseaseArms.bottomRight.enabled = false;
          }
          if (counter <= this.config.field.y) { // First column
            diseaseArms.left.enabled = false;
            diseaseArms.topLeft.enabled = false;
            diseaseArms.bottomLeft.enabled = false;
          }
          if (counter >= (this.config.field.x * this.config.field.y) - (this.config.field.y - 1)) { // Last column
            diseaseArms.right.enabled = false;
            diseaseArms.topRight.enabled = false;
            diseaseArms.bottomRight.enabled = false;
          }

          // Instanciate Person and add to Population array
          this.population.push(new Person(center.x, center.y, disease, status, distances, diseaseArms, this.config.personRadius));

          counter++;
        });
        
        // Store surround people of each person to be infected later 
        counter = 1;
        this.population.forEach(person => {
          let surroundPeople = [];

          // Get closest Person to each direction enabled
          if (person.diseaseArms.top.enabled) {
            surroundPeople.push({ 
              position: "top", 
              person: this.population[(counter - 1) - 1],
            });
          }
          if (person.diseaseArms.topRight.enabled) {
            surroundPeople.push({ 
              position: "topRight", 
              person: this.population[(counter + (this.config.field.y - 1)) - 1],
            });
          }
          if (person.diseaseArms.right.enabled) {
            surroundPeople.push({ 
              position: "right", 
              person: this.population[(counter + this.config.field.y) - 1],
            });
          }
          if (person.diseaseArms.bottomRight.enabled) {
            surroundPeople.push({ 
              position: "bottomRight", 
              person: this.population[(counter + (this.config.field.y + 1)) - 1],
            });
          }
          if (person.diseaseArms.bottom.enabled) {
            surroundPeople.push({ 
              position: "bottom", 
              person: this.population[(counter + 1) - 1],
            });
          }
          if (person.diseaseArms.bottomLeft.enabled) {
            surroundPeople.push({ 
              position: "bottomLeft", 
              person: this.population[(counter - (this.config.field.y - 1)) - 1],
            });
          }
          if (person.diseaseArms.left.enabled) {
            surroundPeople.push({ 
              position: "left", 
              person: this.population[(counter - this.config.field.y) - 1],
            });
          }
          if (person.diseaseArms.topLeft.enabled) {
            surroundPeople.push({ 
              position: "topLeft", 
              person: this.population[(counter - (this.config.field.y + 1)) - 1],
            });
          }

          // Save closest people into each Person (to be infected later) 
          person.setMounted(surroundPeople);

          counter++;
        });
      },
      click: function(event) { // Apply vaccine on population
        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - rect.left; // x position within the element.
        let y = event.clientY - rect.top;  // y position within the element.
        this.population.forEach(person => {
          if (this.getDistance(x, y, person.center.x, person.center.y) < (this.config.clickRadius * 2)) {
            person.applyVaccine();
            if (this.soundStatus === 'on') {
              this.sounds.tap.play();
            }
          }
        });
      },
      initTimer: function() {
        this.config.pausedTime = 0;
        this.config.framerate.then = window.performance.now();
        this.config.framerate.startTime = this.config.framerate.then;
      },
      pauseTimer: function() {
        this.config.pausedTime = this.getRemainingTime();
      },
      continueTimer: function() {
        this.config.framerate.then = window.performance.now();
        this.config.framerate.startTime = this.config.framerate.then;
      },
      startAnimating: function(fps) {
        this.config.framerate.fpsInterval = 1000 / fps;
        this.animate();
      },
      animate: function(timeStamp) {
        // Request another frame
        window.requestAnimationFrame(this.animate);

        if (this.status != 'playing') { return; }

        if (this.getRemainingTimeDisplay() === '0:00') {
          this.pauseGame();
          this.status = 'ended';
          return;
        }

        // Calc elapsed time since last loop
        this.config.framerate.now = timeStamp;
        this.config.framerate.elapsed = this.config.framerate.now - this.config.framerate.then;

        // If enough time has elapsed, draw the next frame
        if (this.config.framerate.elapsed > this.config.framerate.fpsInterval) {
          // Get ready for next frame by setting then = now, but...
          // Also, adjust for fpsInterval not being multiple of 16.67
          this.config.framerate.then = this.config.framerate.now - (this.config.framerate.elapsed % this.config.framerate.fpsInterval);
          
          // Clear canvas
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          // Draw field guidelines
          for (let xCurrent = 0, x = 1; x <= this.config.field.x; x++) { // Horizontal guidelines
            xCurrent += this.xDistance;
          
            this.ctx.beginPath();
            this.ctx.moveTo(xCurrent, this.yDistance);
            this.ctx.lineTo(xCurrent, this.yDistance * this.config.field.y);
            this.ctx.lineWidth = .5;
            this.ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
            this.ctx.stroke();
          }
          for (let yCurrent = 0, y = 1; y <= this.config.field.y; y++) { // Vertical guidelines
            yCurrent += this.yDistance;

            this.ctx.beginPath();
            this.ctx.moveTo(this.xDistance, yCurrent);
            this.ctx.lineTo(this.xDistance * this.config.field.x, yCurrent);
            this.ctx.lineWidth = .5;
            this.ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
            this.ctx.stroke();
          }
          
          // Update population and get it status
          let scores = [];
          this.population.forEach(person => {
            scores.push(person.update(this.ctx));
          });
          
          // Set score
          this.score.healthy = Math.round((this.countItems(scores, 1) / this.centersArray.length) * 100);
          this.score.imune = Math.round((this.countItems(scores, 2) / this.centersArray.length) * 100);
          this.score.sick = Math.round((this.countItems(scores, 3) / this.centersArray.length) * 100);
          
          // Show FPS on debug mode
          if (this.config.debug) {
            let sinceStart = this.config.framerate.now - this.config.framerate.startTime;
            let currentFps = Math.round(1000 / (sinceStart / ++this.config.framerate.frameCount) * 100) / 100;

            // Write FPS on canvas
            this.ctx.font = '25px Arial';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText("Time passed: " + Math.floor(sinceStart / 1000) + " - FPS: " + currentFps, 10, 30);
          }
        }
      },
      randomIntFromRange: function(min, max, except) {
        if (except) {
          let number = Math.floor(Math.random() * (max - min + 1) + min);
          return (except.includes(number)) ? this.randomIntFromRange(min, max, except) : number;
        } else {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
      },
      countItems: function(arr, what){
        var count= 0, i;
        while((i= arr.indexOf(what, i))!= -1){
          ++count;
          ++i;
        }
        return count;
      },
      getDistance: function(x1, y1, x2, y2) {
        const xDist = x2 - x1;
        const yDist = y2 - y1;

        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
      },
      getRemainingTime: function() { // Calc timer, return int value
        let time;

        if (this.config.pausedTime !== 0) {
          time = this.config.pausedTime - ((this.config.framerate.now - this.config.framerate.startTime) / 1000);
        } else {
          time = this.config.timer - ((this.config.framerate.now - this.config.framerate.startTime) / 1000);
        }

        if (isNaN(time)) { return; }

        return time;
      },
      getRemainingTimeDisplay: function() { // Format timer to display on HTML
        if (this.status === 'playing') {
          return formatTime(this.getRemainingTime());
        } else if (this.status === 'not-started') {
          return this.config.timer + 's';
        } else {
          return formatTime(this.config.pausedTime);
        }

        function formatTime(time) {
          return time > 0 ? time.toFixed(2).toString().split('.').join(':') : '0:00';
        };
      },
      playGame: function() {
        if (this.status === 'not-started') {
          this.initTimer();
          this.startAnimating(24);
        } else if (this.status === 'paused') {
          this.continueTimer();
        }

        this.status = 'playing';
      },
      pauseGame: function() {
        if (this.status === 'playing') {
          this.pauseTimer();
          this.status = 'paused';
        }
      },
      restartGame: function() {
        this.status = 'playing';
        this.initTimer();
        this.initGame();
      },
      switchSound: function() {
        if(this.soundStatus === 'on') {
          this.soundStatus = 'off';
        } else {
          this.soundStatus = 'on';
        }
      }
    },
    mounted() {
      // Update Magnetic Cursor Anchors
      this.$root.$emit('updateCursorListeners');

      if (window.innerWidth < 500) {
        this.width = 300;
        this.height = 450;
        this.config.personRadius = 11;
      }

      let { refOverlayInitial, refOverlayPause, refCanvas } = this.$refs;
      TweenLite.to(refOverlayInitial, .5, { opacity: 1, display: 'block'});
      TweenLite.to(refCanvas, .5, { opacity: 0, display: 'none'});

      function onBlur() {
        this.pauseGame();
      }

      if (/*@cc_on!@*/false) { // Check for Internet Explorer
        document.onfocusout = onBlur.bind(this);
      } else {
        window.onblur = onBlur.bind(this);
      }

      this.init();
    },
    watch: {
      status: function (val) {
        let { refOverlayInitial, refOverlayPause, refCanvas, refOverlayEnd } = this.$refs;

        if (val === 'paused') {
          TweenLite.to(refOverlayPause, .5, { opacity: 1, display: 'block'});
          TweenLite.to(refCanvas, .5, { opacity: 0, display: 'none'});

          if (this.soundStatus === 'on') {
            this.sounds.bg.pause();
          }
        } else if (val === 'playing') {
          TweenLite.to(refCanvas, .5, { opacity: 1, display: 'block'});
          TweenLite.to(refOverlayInitial, .5, { opacity: 0, display: 'none'});
          TweenLite.to(refOverlayPause, .5, { opacity: 0, display: 'none'});
          TweenLite.to(refOverlayEnd, .5, { opacity: 0, display: 'none'});
          if (this.soundStatus === 'on') {
            this.sounds.bg.play();
          }
        } else if (val === 'ended') {
          TweenLite.to(refOverlayEnd, .5, { opacity: 1, display: 'block'});
          TweenLite.to(refCanvas, .5, { opacity: 0, display: 'none'});
          if (this.soundStatus === 'on') {
            this.sounds.bg.pause();
            this.sounds.bg.seek(0);
            if(this.score.imune >= 95) {
              this.sounds.win.play();
            } else {
              this.sounds.lose.play();
            }
          }
        }
      },
      'score.healthy': function (val) {
        if (val === 0) {
          setTimeout(() => {
            this.status = 'ended';
          }, 1000);
        }
      },
      soundStatus: function (val) {
        if (val === 'off') {
          this.sounds.bg.pause();
        } else if (val === 'on' && this.status == 'playing') {
          this.sounds.bg.play();        
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '~bootstrap/scss/functions'
  @import '~bootstrap/scss/variables'
  @import '~assets/sass/basics/bootstrap-override'
  @import '~bootstrap/scss/mixins'
  @import '~assets/sass/variables'

  .c-game
    background-color: #25292C
    width: 400px
    touch-action: manipulation
    .game-font-timer
      font-size: 2.5rem
    .game-color-yellow
      color: #EA9B1C
    .game-border-dotted-yellow
      border-bottom: 1px solid rgba(map-get($color-config, "light-gray"), .1)
    .game-color-blue
      color: #43B7F2
    .game-border-dotted-blue
      border-bottom: 1px solid rgba(map-get($color-config, "light-gray"), .1)
    .game-color-red
      color: #DE4648
    .game-border-dotted-red
      border-bottom: 1px solid rgba(map-get($color-config, "light-gray"), .1)
    .game-clock
      display: inline-block
      position: relative
      width: 30px
      height: 30px
      border-radius: 50%
      border: 2px solid map-get($color-config, "orange")
      &::before
        display: block
        content: " "
        width: 2px
        height: calc(40%)
        background-color: map-get($color-config, "orange")
        position: absolute
        left: 50%
        margin-left: -1px
        top: 10% 
        transform-origin: bottom center
        border-radius: 2px 
        animation: rotating 2s linear infinite
        animation-play-state: running
      &::after
        display: block
        content: " "
        width: 2px
        height: calc(30%)
        background-color: map-get($color-config, "orange")
        position: absolute
        left: 50%
        margin-left: -1px
        top: 20% 
        transform-origin: bottom center
        border-radius: 2px 
        animation: rotating 6s linear infinite
        animation-play-state: running
      &.gm-paused,
      &.gm-not-started,
      &.gm-ended
        &::before,
        &::after
          animation-play-state: paused
      span
        display: block
        position: absolute
        width: 4px
        height: 4px
        border-radius: 50%
        background-color: map-get($color-config, "orange")
        top: 50%
        left: 50%
        margin-top: -2px
        margin-left: -2px
    .game-content
      position: relative
      background-color: #2E3337
      line-height: 25px
    .box-scoreboard 100 h-100p
    .icon-face
      width: 25px
      height: 25px
    .icon-face-md
      width: 35px
      height: 35px
    [id*="game-overlay"]
      position: absolute
      z-index: 2
      background-repeat: repeat
      background-position: 0 0
      background-size: auto 100%
      animation: animatedBackground 250s linear infinite
      display: none
      opacity: 0
    #c-game-canvas
      position: absolute
      z-index: 1
    [id*="game-btn-"] 
      display: inline-block
      background-color: transparent
      border: 0
      color: map-get($color-config, "light-gray")
      position: relative
      padding: 0px 13px
      outline: 0
      &:focus,
      &:active
        outline: 0
      &.disabled
        opacity: .2
      &::before,
      &::after
        display: block
        content: " "
        position: absolute
        background-color: map-get($color-config, "light-gray")
      &#game-btn-pause
        &::before,
        &::after
          width: 3px
          height: 12px
          top: 50%
          margin-top: -6px
          transition: all 0.2s ease-out
          opacity: 1
        &::before
          left: 0
        &::after
          left: 5px
      &#game-btn-sound
        &::before
          width: 3px
          height: 8px
          top: 50%
          margin-top: -4px
        &::before
          left: 0
        &::after
          transition: all 0.2s ease-out
          top: 50%
          margin-top: -6px
          left: 0
          background-color: transparent
          width: 0
          height: 0
          border-top: 6px solid transparent
          border-right: 10px solid map-get($color-config, "light-gray")
          border-bottom: 6px solid transparent
        &.gm-sound-on
          &.gm-playing
            &::after
              animation: pulsing 1s linear infinite
        &.gm-sound-off
          &::after
            opacity: .2

  @keyframes animatedBackground
    from
      background-position: 0 0
    to
      background-position: -1000px 0
  
  @keyframes rotating
    from
      -ms-transform: rotate(0deg)
      -moz-transform: rotate(0deg)
      -webkit-transform: rotate(0deg)
      -o-transform: rotate(0deg)
      transform: rotate(0deg)
    to
      -ms-transform: rotate(360deg)
      -moz-transform: rotate(360deg)
      -webkit-transform: rotate(360deg)
      -o-transform: rotate(360deg)
      transform: rotate(360deg)

  @keyframes pulsing
    0%
      -ms-transform: scale(.9)
      -moz-transform: scale(.9)
      -webkit-transform: scale(.9)
      -o-transform: scale(.9)
      transform: scale(.9)
    50%
      -ms-transform: scale(1.1)
      -moz-transform: scale(1.1)
      -webkit-transform: scale(1.1)
      -o-transform: scale(1.1)
      transform: scale(1.1)
    0%
      -ms-transform: scale(.9)
      -moz-transform: scale(.9)
      -webkit-transform: scale(.9)
      -o-transform: scale(.9)
      transform: scale(.9)

  @include media-breakpoint-down(sm)
    .c-game
      .game-font-timer
        font-size: 2rem
</style>

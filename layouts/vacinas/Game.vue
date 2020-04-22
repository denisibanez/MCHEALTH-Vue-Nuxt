<template>
  <div class="c-game shadow-lg rounded">
    <div id="game-header" class="px-5">
      <div class="row justify-content-center">
        <div class="col-7 py-3">
          <h4 class="h1 lay-color-gray">
            00:00        
          </h4>
          <p>Pause - Som</p>
        </div>
        <div class="col-5 py-3">
          Doentes: -<br>
          Saudáveis: -<br>
          Imunizados: -<br>
        </div> 
      </div>
    </div>
    <canvas id="c-game-canvas" :style="{width: this.width + 'px', height: this.height + 'px'}"></canvas>
  </div>
</template>

<script>
import Person from "~/utils/GamePerson";

  export default {
    name: 'Game',
    data: function() {
      return {
        settings: {
          timer: 30,          // (seconds) Max. time to complete the game
          field: {
            x: 6,             // Number of columns
            y: 7,             // Number of rows
          },
          infection: {
            initInfected: 2,
            velocity: {
              axes: {
                min: 2,       // Min. speed to spread on X and Y axes
                max: 4,       // Max. speed to spread on X and Y axes
              },
              diag:  {
                min: 3,       // Min. time to spread on diagonal
                max: 4,       // Max. time to spread on diagonal
              },
            }, 
            chance: 75        // (Percent) Chance of spreading to each person
          },
          person: {
            width: 50,        // (Pixel) Width size of person
            height: 60,       // (Pixel) Height size of person
          },
          clickRadius: 15,
        },
        centersArray: [],
        population: null,
        canvas: null,
        ctx: null,
        xDistance: 0,
        yDistance: 0,
        width: 400,
        height: 570,
      }
    },
    methods: {
      init: function () {
        this.canvas = document.getElementById('c-game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set actual size in memory (scaled to account for extra pixel density).
        let scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        this.canvas.width = this.width * scale;
        this.canvas.height = this.height * scale;

        // Normalize coordinate system to use css pixels.
        this.ctx.scale(scale, scale);

        this.canvas.style.backgroundColor = "#2E3337";

        this.xDistance = Math.trunc(this.width / (this.settings.field.x + 1));
        this.yDistance = Math.trunc(this.height / (this.settings.field.y + 1));

        for (let xCurrent = 0, x = 1; x <= this.settings.field.x; x++) {
          xCurrent += this.xDistance;
          
          for (let yCurrent = 0, y = 1; y <= this.settings.field.y; y++) {
            yCurrent += this.yDistance;
            this.centersArray.push({
              x: xCurrent,
              y: yCurrent,
            });
          }
        }
        
        this.population = [];

        let infected = [];
        let infectedPosition = [];
        let allowedPosition = []
        for (let i = 1; i <= this.settings.field.x * this.settings.field.y; i++) {
          if (
            !(i % this.settings.field.y === 1) &&  // First Row
            !(i % this.settings.field.y === 0) &&  // Last Row
            !(i <= this.settings.field.y) &&  // First Column
            !(i >= (this.settings.field.x * this.settings.field.y) - (this.settings.field.y - 1)) // Last Collum
          ) {
            allowedPosition.push(i);
          } else {
            allowedPosition.push(i);
          }
        }
        for (let i = 0; i < this.settings.infection.initInfected; i++) {
          infectedPosition.push(this.randomIntFromRange(0, allowedPosition.length - 1, infectedPosition));
          infected.push(allowedPosition[infectedPosition[i]]);
        }

        let counter = 1;
        let radius = 15;
        let distances = {
          x: this.xDistance,
          y: this.yDistance,
        }        
        let disease = {};

        this.centersArray.forEach(center => {
          let status = 1;
          let diseaseArms = {
            top:          { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            right:        { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            bottom:       { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            left:         { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            topRight:     { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            bottomRight:  { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            bottomLeft:   { enabled: Math.random() >= 0.5, size: 0, infected: false, },
            topLeft:      { enabled: Math.random() >= 0.5, size: 0, infected: false, },
          };

          if (infected.includes(counter)) {
            status = 3; 
          }

          disease = {     // Velocity of spread capability
            top:          this.randomIntFromRange(this.settings.infection.velocity.axes.min, this.settings.infection.velocity.axes.max),
            right:        this.randomIntFromRange(this.settings.infection.velocity.axes.min, this.settings.infection.velocity.axes.max),
            bottom:       this.randomIntFromRange(this.settings.infection.velocity.axes.min, this.settings.infection.velocity.axes.max),
            left:         this.randomIntFromRange(this.settings.infection.velocity.axes.min, this.settings.infection.velocity.axes.max),
            topRight:     this.randomIntFromRange(this.settings.infection.velocity.diag.min, this.settings.infection.velocity.diag.max),
            bottomRight:  this.randomIntFromRange(this.settings.infection.velocity.diag.min, this.settings.infection.velocity.diag.max),
            bottomLeft:   this.randomIntFromRange(this.settings.infection.velocity.diag.min, this.settings.infection.velocity.diag.max),
            topLeft:      this.randomIntFromRange(this.settings.infection.velocity.diag.min, this.settings.infection.velocity.diag.max),
          };

          if (counter % this.settings.field.y === 1) { // First Row
            diseaseArms.top.enabled = false;
            diseaseArms.topRight.enabled = false;
            diseaseArms.topLeft.enabled = false;
          }
          if (counter % this.settings.field.y === 0) { // Last Row
            diseaseArms.bottom.enabled = false;
            diseaseArms.bottomLeft.enabled = false;
            diseaseArms.bottomRight.enabled = false;
          }
          if (counter <= this.settings.field.y) { // First Column
            diseaseArms.left.enabled = false;
            diseaseArms.topLeft.enabled = false;
            diseaseArms.bottomLeft.enabled = false;
          }
          if (counter >= (this.settings.field.x * this.settings.field.y) - (this.settings.field.y - 1)) { // Last Column
            diseaseArms.right.enabled = false;
            diseaseArms.topRight.enabled = false;
            diseaseArms.bottomRight.enabled = false;
          }

          this.population.push(new Person(center.x, center.y, disease, status, distances, diseaseArms, radius));

          counter++;
        });

        counter = 1
        this.population.forEach(person => {
          let surroundPeople = [];


          if (person.diseaseArms.top.enabled) {
            surroundPeople.push({ 
              position: "top", 
              person: this.population[(counter - 1) - 1],
            });
          }
          if (person.diseaseArms.topRight.enabled) {
            surroundPeople.push({ 
              position: "topRight", 
              person: this.population[(counter + (this.settings.field.y - 1)) - 1],
            });
          }
          if (person.diseaseArms.right.enabled) {
            surroundPeople.push({ 
              position: "right", 
              person: this.population[(counter + this.settings.field.y) - 1],
            });
          }
          if (person.diseaseArms.bottomRight.enabled) {
            surroundPeople.push({ 
              position: "bottomRight", 
              person: this.population[(counter + (this.settings.field.y + 1)) - 1],
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
              person: this.population[(counter - (this.settings.field.y - 1)) - 1],
            });
          }
          if (person.diseaseArms.left.enabled) {
            surroundPeople.push({ 
              position: "left", 
              person: this.population[(counter - this.settings.field.y) - 1],
            });
          }
          if (person.diseaseArms.topLeft.enabled) {
            surroundPeople.push({ 
              position: "topLeft", 
              person: this.population[(counter - (this.settings.field.y + 1)) - 1],
            });
          }

          person.setMounted(surroundPeople);

          counter++;
        });


        this.canvas.addEventListener('click', this.click);

        let clicked = false;
        let downListener = (event) => {
            clicked = true;
        };
        let moveListener = (event) => {
            if (clicked) {
              this.click(event); 
            }
        };
        let upListener = (event) => {
            clicked = false;
        };
        this.canvas.addEventListener('mousedown', downListener);
        this.canvas.addEventListener('mousemove', moveListener);
        this.canvas.addEventListener('mouseup', upListener);

        // release memory
        // this.canvas.removeEventListener('mousedown', downListener)
        // this.canvas.removeEventListener('mousemove', moveListener)
        // this.canvas.removeEventListener('mouseup', upListener)
      },
      click: function(event) {
        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - rect.left; // x position within the element.
        let y = event.clientY - rect.top;  // y position within the element.
        this.population.forEach(person => {
          if (this.getDistance(x, y, person.center.x, person.center.y) < (this.settings.clickRadius * 2)) {
            person.applyVaccine();
          }
        });
      },
      animate: function() {
        requestAnimationFrame(this.animate);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw field guidelines
        for (let xCurrent = 0, x = 1; x <= this.settings.field.x; x++) {
          xCurrent += this.xDistance;
         
          this.ctx.beginPath();
          this.ctx.moveTo(xCurrent, this.yDistance);
          this.ctx.lineTo(xCurrent, this.yDistance * this.settings.field.y);
          this.ctx.lineWidth = .5;
          this.ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
          this.ctx.stroke();
        }
        for (let yCurrent = 0, y = 1; y <= this.settings.field.y; y++) {
          yCurrent += this.yDistance;

          this.ctx.beginPath();
          this.ctx.moveTo(this.xDistance, yCurrent);
          this.ctx.lineTo(this.xDistance * this.settings.field.x, yCurrent);
          this.ctx.lineWidth = .5;
          this.ctx.strokeStyle = 'rgba(255, 255, 255, .2)';
          this.ctx.stroke();
        }

        this.population.forEach(person => {
          person.update(this.ctx);
        });
      },
      randomIntFromRange: function (min, max, except) {
        if (except) {
          let number = Math.floor(Math.random() * (max - min + 1) + min);
          return (except.includes(number)) ? this.randomIntFromRange(min, max, except) : number;
        } else {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
      },
      getDistance: function(x1, y1, x2, y2) {
        const xDist = x2 - x1;
        const yDist = y2 - y1;

        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
      },
    },
    mounted() {
      this.init();
      this.animate();
    },
  }
</script>

<style lang="sass" scoped>
  .c-game
    background-color: #25292C
    width: 400px
    touch-action: manipulation

</style>

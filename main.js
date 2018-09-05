//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')


//GLOBAL VARIABLES
var frames = 0;
var interval;
var notes = []
var images = {
 note:"./img/roundNote.png",
 noteHit: "./img/noteHit.png",
 noteMissed: "./img/noteMissed.png",
 hitBar: "./img/bongo.png",
 bg: "./img/cuba.jpg"

}

//CLASSES
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.mode = "play" //record
    this.width = canvas.width
    this.height = canvas.height
    this.bg = document.createElement('img')
    this.bg.src = images.bg
    this.bg.onload = () => {
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "./audio/rebelion.mp3"
    this.hitBar = document.createElement('img')
    this.hitBar.src = images.hitBar
    this.hitBar.onload = () => {
      this.draw()
    }
  }
  draw() {

      //Draw BG 
      //this.x -= .5
      if(this.x < -this.width ) this.x = 0
      ctx.drawImage(this.bg,this.x,this.y,this.width,this.height)      
      ctx.drawImage(this.bg,this.x + this.width,this.y,this.width,this.height)
      ctx.globalCompositeOperation='source-atop';

      //SHOW FRAMES
      ctx.font = "50px Avenir"
      ctx.fillStyle = "white"
      var time = frames/100
      ctx.fillText(time.toFixed(2),100,100)
  
      //Draw Hitbar
      ctx.drawImage(this.hitBar,300,400,this.width/2,100) 


      //SHOW MODE
      ctx.font = "30px Avenir"
      ctx.fillStyle = "white"
      var time = frames/100
      ctx.fillText("Mode: " + this.mode,300,100)
       


  }
}
class Note{
  constructor(frame){
      this.frame = frame
      this.wasHit = null;
      this.x = 500
      this.y = 0
      this.width = 40
      this.height = 30
      this.gravity = 3
      this.image = new Image()
      this.image.src = images.note
      this.image.onload = () => {
          this.draw()
      }
      //this.music = new Audio()
      //this.musci.src = "Crash.mp3"
  }
  draw(){
    if(frames >= this.frame) {
      this.y++;
      ctx.globalCompositeOperation='destination-over';
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
    }
  }
  hit(){
    this.wasHit = true;
    this.image.src = images.noteHit
  }
  miss(){
    this.wasHit = false;
    this.image.src = images.noteMissed
  }
}

//INSTANCES
// var song = new Audio()
// song.src="./audio/rebelion.mp3"
var board = new Board();

//MAIN FUNCTIONS: update, start 
function start() {
  console.log("started")
  if(interval) return
  interval = setInterval(update, 1000/100)
  generateNotes()
  board.music.play()
  //window.clearInterval(interval)
}
function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  frames++;
  drawNotes()
  board.draw()
}
function stop(){
  
  clearInterval(interval)
  interval = null
  board.music.load()
  notes = []
  frames = 0;
  ctx.clearRect(0,0,canvas.width,canvas.height)
  board.draw()
}

//HELPER FUNCTIONS(ej. collisions)

function generateNotes(){
  // times = [200,400,600,800,1100]
  // for (t in times) {
  //   notes.push(new Note(times[t]))
  // }
  for (i = 0; i <100; i ++)
      notes.push(new Note(100 + Math.floor(Math.random() * 200*i)))
}
function drawNotes(){
  notes.forEach(function(note){
    if(note.y > 450 && !note.wasHit)
      note.miss()
      note.draw()
  })
}
function recordNotes() {} //this will be used in recording mode

function hitNote(){
  notes.forEach(function(note){
    if(note.y > 400 && note.y < 500)
     note.hit()
})
}

//EVENT LISTENERS

addEventListener('keydown', function(e){
    console.log(e.key)
   if(e.key === "Enter"){
       start()
   }
   if(e.key === "q"){
    stop()
    }

  if(e.code === "Space"){
    console.log("Space")
    hitNote()
  }

  })



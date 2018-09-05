//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')


//GLOBAL VARIABLES
var frames = 0;
var interval;
var notes = []
var images = {
 note:"./img/note.png",
 noteHit: "./img/noteHit.png"
  // pipe1:"obstacle_bottom.png",
  // pipe2: "obstacle_top.png"

}

//CLASSES
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    // this.image = document.createElement('img')
    // this.image.src = images.bg
    // this.image.onload = () => {
    //   this.draw()
    // }
    this.music = new Audio()
    this.music.src = "./audio/rebelion.mp3"
  }
  draw() {
    /*this.x -= .5
    if(this.x < -this.width ) this.x = 0
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)      
    ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)*/

    //SHOW FRAMES
    ctx.font = "50px Avenir"
    ctx.fillStyle = "black"
    var time = frames/100
    ctx.fillText(time.toFixed(2),100,100)

  }
}
class Note{
  constructor(frame){
      this.frame = frame
      this.wasHit = null;
      this.x = 200
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
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
    }
  }
  hit(){
    this.image.src = images.noteHit
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
  times = [200,400,600,800,1100]
  for (t in times) {
    notes.push(new Note(times[t]))
  }
}
function drawNotes(){
  notes.forEach(function(note){
      note.draw()
  })
}
function playNotes() {} //this will be used in recording mode

function hitNote(){
  notes.forEach(function(note){
    if(note.y > 300 && note.y <400)
     note.hit()
    // console.log("hit")
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



//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')


//GLOBAL VARIABLES
var frames = 0;
var interval;
var notes = []
var images = {
 note:"./img/roundNote.png",
 noteHit: "./img/plusone.png",
 noteMissed: "./img/noteMissed.png",
 celia0: "./img/celia0.png",
 celia1: "./img/celia1.png",
 bg: "./img/cuba.jpg"

}

//CLASSES
class Board {
  constructor() {
    this.x = 0
    this.y = 0
    this.mode = "play" //record
    this.score = 0;
    this.total = 0;
    this.width = canvas.width
    this.height = canvas.height
    this.bg = document.createElement('img')
    this.bg.src = images.bg
    //this.bg.onload = () => {
      //this.draw()
    //}
    this.music = new Audio()
    this.music.src = "./audio/rebelion.mp3"
    this.celia = document.createElement('img')
    this.celia.src = images.celia0

  }
  draw() {
      //Draw BG 
      ctx.drawImage(this.bg,this.x,this.y,this.width,this.height)      
      ctx.globalCompositeOperation='source-atop';
  
      //Draw Celia
      ctx.drawImage(this.celia,310,230,300,300) 

      //Draw Nav
      ctx.globalAlpha = 0.8
      ctx.fillStyle = "orange"
      ctx.fillRect(0,0,this.width, 60)
      ctx.globalAlpha = 1

      //Draw Time
      ctx.font = "30px Cinzel"
      ctx.fillStyle = "white"
      var time = frames/100
      ctx.fillText(time.toFixed(2),100,40)

      //Draw Mode
      ctx.font = "30px Cinzel"
      ctx.fillStyle = "white"
      var time = frames/100
      ctx.fillText("Mode: " + this.mode,300,40)

      //Draw Score
      ctx.font = "30px Cinzel"
      ctx.fillStyle = "white"
      ctx.fillText("Points: " + this.score + "/" + this.total ,this.width-250,40)
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
      //this.music = new Audio()
      //this.musci.src = "Crash.mp3"
  }
  draw(){
    if(frames >= this.frame) {
      if(!this.wasHit)
        this.y++;
      else 
        this.x++;
      ctx.globalCompositeOperation='destination-over';
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
    }
  }
  hit(){
    this.wasHit = true;
    this.image.src = images.noteHit
    board.score++;
  }
  miss(){
    this.wasHit = false;
    this.image.src = images.noteMissed
  }
}

//INSTANCES
var board = new Board();

//MAIN FUNCTIONS: update, start 
function start() {
  console.log("started")
  if(interval) return
  interval = setInterval(update, 1000/100)
  board.music.play()
  switch (board.mode) {
    case "play": 
      generateNotes()
      break;
    // case "record":
    //   break;

  }

  //window.clearInterval(interval)
}
function update(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  frames++;
  if(board.mode === "play")
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
  var total = 0; 
  notes.forEach(function(note){
    if(note.y > 370 && !note.wasHit)
      note.miss()
    if(note.wasHit != null)
      total++;
    note.draw()
  })
  board.total = total;
}
function recordNotes() {
  notes.push(new Note(frames));
  console.log(notes);
  //trigger some animation
} 

function hitNotes(){
  notes.forEach(function(note){
    if(note.y > 350 && note.y < 370 && !note.wasHit)
     note.hit()
})
}

//EVENT LISTENERS
window.onload = () => {
  console.log("loaded")
  start()
}

addEventListener('keyup', function(e){
    console.log(e.key)
   if(e.key === "Enter"){
       //start()
   }
   if(e.key === "q"){
    stop()
    }

    // if(e.key === "r"){
    //   board.mode = "record"
    //   stop()
    //   start()
    //   }

  if(e.code === "Space"){
    switch (board.mode) {
      case "play": 
        board.celia.src = images.celia1;
        setTimeout(()=>{
          board.celia.src = images.celia0;
        }, 200)
         hitNotes();
        break;
      // case "record":
      //   recordNotes();
      //   break;
    }
  }

  })



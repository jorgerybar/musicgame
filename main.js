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

      //SHOW FRAMES
      ctx.font = "50px Avenir"
      ctx.fillStyle = "white"
      var time = frames/100
      ctx.fillText(time.toFixed(2),100,100)
  
      //Draw Celia
      ctx.drawImage(this.celia,310,300,300,300) 

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
  notes.forEach(function(note){
    if(note.y > 450 && !note.wasHit)
      note.miss()
    note.draw()
  })
}
function recordNotes() {
  notes.push(new Note(frames));
  console.log(notes);
  //trigger some animation
} 

function hitNotes(){
  notes.forEach(function(note){
    if(note.y > 400 && note.y < 500)
     note.hit()
})
}

//EVENT LISTENERS
window.onload = () => {
  console.log("loaded")
  start()
}

addEventListener('keydown', function(e){
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



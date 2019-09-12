//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')

//-------------------------------------
//-------------------------------------
//GLOBAL VARIABLES
//-------------------------------------
//-------------------------------------

var frames = 0;
var interval;
var welcomeInterval
var notes = []
var images = {
 note:"./img/roundNote.png",
 noteHit: "./img/plusone1.png",
 noteMissed: "./img/noteMissed.png",
 celia0: "./img/celia0.png",
 celia1: "./img/celia1.png",
 celia2: "./img/celia2.png",
 celia3: "./img/celia3.png",
 welcome0: "./img/welcome0.png",
 welcome1: "./img/welcome1.png",
 bg: "./img/cuba.jpg"

}
//-------------------------------------
//-------------------------------------
//CLASSES
//-------------------------------------
//-------------------------------------
class Celia {
  constructor(){
    this.x = 310;
    this.speed = 0;
    this.pressed = false
    this.orientation = 'left'
  }

}

let welcomebg =document.createElement('img')
welcomebg.src =images.welcome0

class Welcome {
  constructor(){
    this.flash = false
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    //this.bg = document.createElement('img')
    //this.bg.src = images.welcome0
  }
  
  draw(){
   // ctx.drawImage(this.bg,this.x,this.y,this.width,this.height)     
    ctx.drawImage(welcomebg,this.x,this.y,this.width,this.height)       
    ctx.globalCompositeOperation='source-atop';
  }
  
  welcomeUpdate(){
    console.log('updating wleomc')
    if(!this.flash){
      //this.bg.src
      welcomebg.src = images.welcome1
      this.flash =true
    }
    else {
      //this.bg.src
      welcomebg.src = images.welcome0
      this.flash =false
    }
    this.draw()
  }

}

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
      ctx.drawImage(this.celia,CeliaPos.x,230,300,300) 

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
      // ctx.font = "30px Cinzel"
      // ctx.fillStyle = "white"
      // var time = frames/100
      // ctx.fillText("Mode: " + this.mode,300,40)

      //Draw Speed
      // ctx.font = "30px Cinzel"
      // ctx.fillStyle = "white"
      // ctx.fillText("Speed: " + CeliaPos.speed.toFixed(2),300,40)

      //Draw Score
      ctx.font = "30px Cinzel"
      ctx.fillStyle = "white"
      ctx.fillText("Puntos: " + this.score + "/" + this.total ,this.width-250,40)
  }
}
class Note{
  constructor(frame, x){
      this.frame = frame
      this.wasHit = null;
      this.hitDirection = null;
      this.x = x
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
      else if (this.hitDirection === 'left')
        this.x+=3;
      else 
        this.x-=3;
      ctx.globalCompositeOperation='destination-over';
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
    }
  }
  hit(){
    this.wasHit = true;
    this.hitDirection = CeliaPos.orientation
    this.image.src = images.noteHit
    board.score++;
  }
  miss(){
    this.wasHit = false;
    this.image.src = images.noteMissed
  }
}

//-------------------------------------
//-------------------------------------
//INSTANCES
//-------------------------------------
//-------------------------------------

var welcome = new  Welcome();
var CeliaPos = new Celia();
var board = new Board();

//-------------------------------------
//-------------------------------------
//MAIN FUNCTIONS: update, start 
//-------------------------------------
//-------------------------------------
function start() {
  board.draw()
  console.log("started")
  if(interval) return
  interval = setInterval(update, 1000/100)
 // board.music.play()
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
  //if((CeliaPos.speed>1 ||CeliaPos.speed<-1))
  if(!CeliaPos.pressed) 
    CeliaPos.speed*=0.85
  CeliaPos.x+=CeliaPos.speed; 
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

//-------------------------------------
//-------------------------------------
//HELPER FUNCTIONS(ej. collisions)
//-------------------------------------
//-------------------------------------

function generateNotes(){
  // times = [200,400,600,800,1100]
  // for (t in times) {
  //   notes.push(new Note(times[t]))
  // }
  for (i = 0; i <300; i ++)
      notes.push(new Note((100 + Math.floor(Math.random() * 200 + (200-i/3)*i)),200+Math.random()*600))
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
    if(note.y > 340 && 
      note.y < 380 && 
      note.x < CeliaPos.x + 180  &&
      note.x > CeliaPos.x  &&
      !note.wasHit)
     note.hit()
})
}
//-------------------------------------
//-------------------------------------
//EVENT LISTENERS
//-------------------------------------
//-------------------------------------

window.onload = () => {
  console.log("loaded")
  ctx.clearRect(0,0,canvas.width,canvas.height)
  welcome.draw()
  welcomeInterval = setInterval(()=>{welcome.welcomeUpdate()}, 450)
 // start()
}

addEventListener('keydown',(e)=>{
  if(e.key === "ArrowLeft"){
    CeliaPos.orientation='left'
    if(CeliaPos.speed>-3)
      CeliaPos.speed=-3;
    else if (CeliaPos.speed>-5)
      CeliaPos.speed-=2;
    CeliaPos.x+=CeliaPos.speed;
    CeliaPos.pressed = true
    if((frames / 7) % 2 < 1){
      board.celia.src = images.celia1;
      hitNotes()
    }
    else  
      board.celia.src = images.celia0;

  }
  
  if(e.key === "ArrowRight"){
    CeliaPos.orientation='right'
    if(CeliaPos.speed<3)
      CeliaPos.speed=3;
    else if (CeliaPos.speed<5)
      CeliaPos.speed+=2;
    CeliaPos.x+=CeliaPos.speed;
    CeliaPos.pressed = true
    if((frames / 7) % 2 < 1){
      board.celia.src = images.celia3;
      hitNotes()
    }
    else  
      board.celia.src = images.celia2;


  }

})


addEventListener('keyup', function(e){
    console.log(e.key)
   if(e.key === "Enter"){
    board.music.play()
    clearInterval(welcomeInterval)
       start()
   }
   if(e.key === "q"){
    stop()
    }
  
    if(e.key === "ArrowLeft" ){
      CeliaPos.pressed=false
      board.celia.src = images.celia0;
    }

    if( e.key === "ArrowRight"){
      CeliaPos.pressed=false
      board.celia.src = images.celia2;
    }

  
    // if(e.key === "r"){
    //   board.mode = "record"
    //   stop()
    //   start()
    //   }

  if(e.code === "Space"){
    switch (board.mode) {
      case "play": 
        if(CeliaPos.orientation==='left'){
          console.log('left butt')
          board.celia.src = images.celia1;
          setTimeout(()=>{
            board.celia.src = images.celia0;
          }, 200)}
        else  {
          console.log('right butt')
          board.celia.src = images.celia3;
          setTimeout(()=>{
            board.celia.src = images.celia2;
          }, 200)
        }
        hitNotes();
        break;
      // case "record":
      //   recordNotes();
      //   break;
    }
  }

  })



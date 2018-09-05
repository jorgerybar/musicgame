//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')


//GLOBAL VARIABLES
var frames = 0;
var interval;
var times = []
raw = [2,4,6,8,11]
for (t in raw) {
  times.push({
  frame: raw[t],
  hit: null, //true, false
  duration: 1}) 
}
var note = document.getElementById("note")
var next = times.shift()
var button = document.getElementById("but")
var images = {
 note:"./img/note.png"
  // flappy: "flappy.png",
  // pipe1:"obstacle_bottom.png",
  // pipe2: "obstacle_top.png"

}

//CLASSES

class Note{
  constructor(){
      this.x = 100
      this.y = 150
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
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

//INSTANCES
var song = new Audio()
song.src="./audio/rebelion.mp3"
var note= new Note()

//MAIN FUNCTIONS: update, start 
function start() {
  console.log("started")
  if(interval) return
  interval = setInterval(update, 1000)
  song.play()
  //window.clearInterval(interval)
}
function update(){
  frames++;
  //ctx.clearRect(0,0,canvas.width,canvas.height)
  playNotes()
  note.draw()
}
function stop(){
  clearInterval(interval)
  song.pause()

}

//HELPER FUNCTIONS(ej. collisions)
function playNotes() {
  document.getElementById("frames").innerHTML = Math.floor(frames);

  if(times.length >=1) {
    if (frames === next.frame) {
          document.getElementById("note").classList.toggle("invisible")
    }
    if (frames === next.frame + next.duration) {
          document.getElementById("note").classList.toggle("invisible")
          next = times.shift()
    }
  }
}

//EVENT LISTENERS
button.onclick = () => {
  if (next.hit == null && frames >= next.frame && frames <= next.frame + next.duration) {
    console.log("hit")
    next.hit = true;
    }
  else {}
  }

addEventListener('keydown', function(e){
    console.log(e.key)
   if(e.key === "Enter"){
       start()
   }
   if(e.key === "q"){
    stop()
    }

  })



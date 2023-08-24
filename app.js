let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let high = 0;
let btns = ["red","yellow","purple","green"];
let h2 = document.querySelector(".levell");
let body = document.querySelector("body");
let select = new Audio('./assets/select.mp3');
let win = new Audio('./assets/win.mp3');
let wrong = new Audio('./assets/wrong.mp3');
let span = document.querySelector("span");
if (window.matchMedia("(orientation: portrait)").matches) {
    h2.innerText=`Click on start Game.`;
 }
 else{
    h2.innerText='Press any key to start the game.';
 }
function startgame() {
    if(started==false){
        h2.innerHTML="Game has Started !<br>Repeat the Sequence";
        started=true;
        setTimeout(()=>{
            h2.innerText=`Level ${level}`},400);
        setTimeout(() => {
            levelUp();
        },500);
        };
}
setTimeout(()=>{
    document.addEventListener("keypress",startgame);
    span.addEventListener("click",startgame);
},100);
function gameFlash(btn){
    btn.classList.add("gameflash");
    if (select.paused) {
        select.play();
    } else{
        select.currentTime = 0;
    }
    setTimeout(()=>{
        btn.classList.remove("gameflash");
    },350);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },100);
}
function reset(){
    gameSeq=[];
    userSeq=[];
    started=false;
    level=0;
}
function checkAns(len){
    if(userSeq[len]==gameSeq[len]){
        if (select.paused) {
            select.play();
        } else{
            select.currentTime = 0;
        }
        
        if(userSeq.length==gameSeq.length){
            level++;
            setTimeout(()=>{
                h2.innerText=`Level ${level}`},300);
           setTimeout(levelUp,1030);
    }
    }
    else{
        if (wrong.paused) {
            wrong.play();
        } else{
            wrong.currentTime = 0;
        }
        if (window.matchMedia("(orientation: portrait)").matches) {
            h2.innerHTML=`Game Over! Your Score was ${level}.<br> Press on Start Game to continue.`;
         }
         else{
            h2.innerHTML=`Game Over! Your Score was ${level}.<br> Press any key to start.`;
         }
      body.style.backgroundColor="red";
      document.querySelector("h3").innerText=`High Score : ${high}`;
      setTimeout(()=>{
        body.style.backgroundColor="#1b1717";
      },150);
      setTimeout(()=>{
        reset();
      },10);
    }
}
function levelUp(){
    if(started==true){
    userSeq=[];
    if(level>high){
        high++;
    }
    let rand = Math.floor(Math.random()*4);
    let randcolor = btns[rand];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    gameFlash(randbtn);
}
}
function userPress() {
    userFlash(this);
    let id = this.getAttribute("id");
    userSeq.push(id);
    checkAns(userSeq.length-1);
}
let btnss = document.querySelectorAll(".btn");
for(let i =0;i<btnss.length;i++){
btnss[i].addEventListener("click",userPress);
}

//sdsdsada
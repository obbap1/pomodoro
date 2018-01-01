//Defining our constants and variables
const animation = document.getElementById('banner').getElementsByClassName('fill')
, playOrPause = document.getElementById('playOrPause')
,sessionTimer = document.getElementById('sessionTimer')
, breakTimer = document.getElementById('breakTimer')
,plusBreak = document.getElementById('plusBreak')
,subtractBreak = document.getElementById('subtractBreak')
,plusSession = document.getElementById('plusSession')
,subtractSession = document.getElementById('subtractSession')
,timer = document.getElementById('timer');
let sessionNumber = 2,breakNumber = 1,setInt,runSetInterval,
computeDestiny,callBreak,displayTime,minutes,seconds,
session = true;

// set default values for both break and session timers
sessionTimer.innerHTML = sessionNumber;
breakTimer.innerHTML = breakNumber;
equateTimer(sessionTimer.innerHTML);

// variable for set INterval
let decider,
sessionLength;
let play = 0;
//our flows for the play or pause sure g
playOrPause.addEventListener('click', () => {
if (playOrPause.innerHTML == 'Play') {
  play++;
  playOrPause.innerHTML = 'Pause';
  runSetInterval();
  sessionToSeconds()
  animation[0].style.animationPlayState ="running";
}
else {
  play ++;
  playOrPause.innerHTML = 'Play';
  clearInterval(setInt);
  atPause();
}
});
displayTime = (min, sec) => {timer.innerHTML = `${min}m : ${sec}s`;}
runSetInterval = () => {
setInt = setInterval( computeDestiny, 1000);
}
//disable buttons upon when timer is playing
let disableButtons = () =>{
plusSession.disabled = true;subtractSession.disabled = true;plusBreak.disabled = true;subtractBreak.disabled = true;
}
//Enable buttons
let enableButtons = () =>{
plusSession.disabled = false;subtractSession.disabled = false;plusBreak.disabled = false;subtractBreak.disabled = false;
}
let sessionToSeconds = () =>{
localStorage.setItem("previous",sessionNumber);
sessionNumber *= 60; 
sessionLength = sessionNumber;
animation[0].style.animationDuration = sessionNumber + 5 + 's';

}
//Compute timer
computeDestiny = () => {
document.getElementById('timer').style.margin = '-90px 0px 0px -5px';
disableButtons();
sessionNumber -= 1;
if (sessionNumber == 0) {
  session = !session;
  clearInterval(setInt);
  callBreak();
  animation[0].style.animation = 'none';
} else if (sessionNumber < 0) {clearInterval(setInt);}
else {
  minutes = Math.floor(sessionNumber / 60);
  seconds = sessionNumber % 60;
  localStorage.setItem("minutes",minutes);
  localStorage.setItem("seconds",seconds);
  displayTime(minutes, seconds);
}
}
//At pause of the timer
let atPause =  () =>{
let minutes = localStorage.getItem("minutes");
let seconds = localStorage.getItem("seconds");
sessionNumber = parseInt(minutes) + (parseInt(seconds))/60;
displayTime(minutes,seconds);
enableButtons();
animation[0].style.animationPlayState = "paused";
}
//Switching to break
callBreak = () => {
let wav = 'http://www.orangefreesounds.com/wp-content/uploads/2016/06/Ringing-clock.mp3?_=1';
let audio = new Audio(wav);
audio.play();
equateTimer(breakTimer.innerHTML);   
if (!session) {sessionNumber = breakNumber * 60;}
else {sessionNumber += sessionLength;} 
animation[0].style.transform = 'none';
durationTime = sessionNumber * 1000;
animation[0].animate([
  {transform:'translate(0, -5px)'},
  {transform:'translate(0,150px)'}
],{
  duration: durationTime,
  iteraions:Infinity,
  direction:'reverse',
  id:'fillAction'
});
runSetInterval();
}
//What will be displayed
function equateTimer(x) {timer.innerHTML = x;}
// function to change time on the selector
function computeTime(x) {
sessionNumber = Math.round(sessionNumber);
breakNumber = Math.round(breakNumber);
if (decider == 1) {sessionNumber += x;} 
else if (decider == 2) {breakNumber += x;}
if (sessionNumber < 1) { sessionNumber = 1;}
if (breakNumber < 1) {breakNumber = 1;}
sessionTimer.innerHTML = sessionNumber;
breakTimer.innerHTML = breakNumber;
equateTimer(sessionTimer.innerHTML);
}
//  Button event listeners
plusSession.addEventListener('click', () => {decider = 1;computeTime(1);});
subtractSession.addEventListener('click', () => { decider = 1;computeTime(-1);})
plusBreak.addEventListener('click', () => {decider = 2;computeTime(1);})
subtractBreak.addEventListener('click', () => {decider = 2; computeTime(-1);})

const canvas = document.getElementById('gameGrid');
const context = canvas.getContext('2d');
import playerTwoAI from './bikeTwoAI'

import Bike from './Bike.js';

const countdownID = document.getElementById('countdown');
const startGameID = document.getElementById('start-game');
const nextRoundID = document.getElementById('next-round');
const titleScreenID = document.getElementById('title-screen');
const victoryScreenID = document.getElementById('victory-screen');
const finalScoreID = document.getElementById('final-score');

let stopAnimation = require('./Bike.js');
let coordinateArray;

let animationTimer;
let framerate;
let countdownTimer;
let stopAnimation1 = false;
let stopAnimation2 = false;
let victoryCheckTimer;

let numberOfPlayers;

let bikeOne = new Bike(950, 270, 10, 'rgb(223,116,12)', 'left', 3);
let bikeTwo = new Bike(50, 270, 10, 'rgb(34,218,222)', 'right', 3);
let counter;
let deathCounter = 0;
let deathTimer;
let explosionX;
let explosionY;

const beginning = () =>  {
  coordinateArray = [];
  document.querySelector('#start-game').addEventListener('click', function() {
    counter = 3;
    deathCounter = 0;
    stopAnimation = false;
    countdown();
    gamePrep();
  });
}

const nextRound = () => {
  nextRoundID.style.display = 'block';
  document.getElementById('bike-one-lives').innerText = bikeOne.lives;
  document.getElementById('bike-two-lives').innerText = bikeTwo.lives;
  document.getElementById('next-round-button').addEventListener('click', function() {
    coordinateArray = [];
    goAgain();
  });
}

const goAgain = () => {
  nextRoundID.style.display = '';
  countdownID.style.display = '';
  stopAnimation = false;
  context.clearRect(0, 0, canvas.width, canvas.height);
  gameGrid();
  counter = 3;
  deathCounter = 0;
  countdown();
  gamePrep()
}

const resetBikes = () => {
  bikeOne.locationX = 950;
  bikeOne.locationY = 270;
  bikeOne.direction = "left";
  bikeTwo.locationX = 50;
  bikeTwo.locationY = 270;
  bikeTwo.direction = "right";
  if (bikeOne.lives === 0 || bikeTwo.lives ===0) {
    bikeOne.lives = 3;
    bikeTwo.lives = 3;
  }
}

const gamePrep = () => {
  resetBikes();
  animationTimer = document.querySelector('input[name="speed"]:checked').value;
  numberOfPlayers = document.querySelector('input[name="players"]:checked').value;
  hideTitleScreen(startGameID);
  hideTitleScreen(titleScreenID);
  countdownID.style.display  = '';
}

const countdown = () => {
  if (counter === 0) {
    hideTitleScreen(countdownID);
    animate()
  } else {
  displayCountdown();
  }
}

const displayCountdown = () => {
  clearTimeout(countdownTimer);
  countdownID.innerText = counter;
  counter--;
  countdownTimer = setTimeout(countdown, 1000);
}

const hideTitleScreen = (obj) => {
  obj.style.display = 'none'
}

const gameGrid = () => {
  context.fillStyle = "rgb(29,53,65)";
  context.fillRect(0, 0, 1000, 550);
  for (let i = 0; i < 1000; i += 50) {
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, 550);
    context.moveTo(0, i);
    context.lineTo(1000, i);
    context.strokeStyle = "rgb(230,222,235)";
    context.stroke();
  }
}

document.addEventListener('keydown', function(key) {
  let directionCode = key.keyCode;

  switch (directionCode) {
    case 37: bikeOne.checkDirection('left'); break;
    case 38: bikeOne.checkDirection('up'); break;
    case 39: bikeOne.checkDirection('right'); break;
    case 40: bikeOne.checkDirection('down'); break;
    case 65: bikeTwo.checkDirection('left'); break;
    case 87: bikeTwo.checkDirection('up'); break;
    case 68: bikeTwo.checkDirection('right'); break;
    case 83: bikeTwo.checkDirection('down'); break;
  }
});

const victoryCheck = () => {
  if (bikeOne.lives === 0 && bikeTwo.lives === 0) {
    victoryScreenID.style.display = 'block';
    finalScoreID.innerText = "Tie! How'd you manage that?";
    resetAll();
    return;
  }
  else if (bikeOne.lives === 0) {
    victoryScreenID.style.display = 'block';
    finalScoreID.innerText = "Blue player wins!";
    resetAll();
    return;
  }
  else if (bikeTwo.lives === 0) {
    victoryScreenID.style.display = 'block';
    finalScoreID.innerText = "Orange player wins!";
    resetAll();
    return;
  }
  else {
    nextRound();
    return;
  }
}

const resetAll = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  coordinateArray = [];
  gameGrid();
  resetBikes();
  document.querySelector('#new-game').addEventListener('click', function() {
    victoryScreenID.style.display = '';
    nextRoundID.style.display     = '';
    titleScreenID.style.display   = '';
    startGameID.style.display     = '';
    beginning();
    return;
  });
  return;
}

const animate = () => {
  clearTimeout(framerate);
  bikeOne.draw(context);
  bikeTwo.draw(context);
  bikeOne.travelTracker(coordinateArray);
  bikeTwo.travelTracker(coordinateArray);
  bikeOne.move(bikeOne.direction);
  bikeTwo.move(bikeTwo.direction);
  stopAnimation1 = bikeOne.youDie(coordinateArray, stopAnimation);
  stopAnimation2 = bikeTwo.youDie(coordinateArray, stopAnimation);
  if (numberOfPlayers == 1) {
    playerTwoAI(bikeTwo, coordinateArray);
  }
  if (stopAnimation1 || stopAnimation2) {
    deathSign();
    return;
  } else {
    framerate = setTimeout(animate, animationTimer);
    return;
  }
}

const deathSign = () => {
  clearTimeout(victoryCheckTimer)
  if(stopAnimation1) {
    explosionX = bikeOne.locationX + 5;
    explosionY = bikeOne.locationY + 5;
    drawDeath('rgb(223,116,12)');

  }
  if(stopAnimation2) {
    explosionX = bikeTwo.locationX + 5;
    explosionY = bikeTwo.locationY + 5;
    drawDeath();
  }
  victoryCheckTimer = setTimeout(victoryCheck, 2000);
}

const drawDeath = (color) => {
  clearTimeout(deathTimer);
  if(deathCounter < 7) {
    let explosionSize = deathCounter * 5;
    context.beginPath();
    context.fillStyle = "rgb(253,169,41)";
    context.arc(explosionX, explosionY, explosionSize, 0, 6.28, false)
    context.fill();
    deathCounter++
    deathTimer = setTimeout(drawDeath, 35)
  }
  else if(deathCounter < 15) {
    let explosionSize = (deathCounter - 7) * 5;
    context.beginPath();
    context.fillStyle = "rgb(29,53,65)";
    context.arc(explosionX, explosionY, explosionSize, 0, 6.28, false)
    context.fill();
    deathCounter++
    deathTimer = setTimeout(drawDeath, 35)
  } else {
    return
  }
}

gameGrid();
beginning();

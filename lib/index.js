var Bike = require('./bikeses6.js');
var stopAnimation = require('./bikeses6.js');
var coordinateArray = coordinateArray || []

var canvas = document.getElementById('gameGrid');
var context = canvas.getContext('2d');

// var startAnimation;
var stopAnimation;
var animationTimer;
var framerate;
var countdownTimer;

var bikeOne = new Bike(950, 270, 10, 'rgb(223,116,12)', 'left', 3);
var bikeTwo = new Bike(50, 270, 10, 'rgb(34,218,222)', 'right', 3);
var counter;

function beginning () {
  document.querySelector('#start-game').addEventListener('click', function() {
    counter = 3;
    stopAnimation = false;
    countdown();
  });
}

function nextRound() {
  document.getElementById('next-round').style.display = 'block';
  document.getElementById('bike-one-lives').innerText = bikeOne.lives;
  document.getElementById('bike-two-lives').innerText = bikeTwo.lives;
  document.getElementById('next-round-button').addEventListener('click', () => {
    coordinateArray = [];
    goAgain();
  });
};

function goAgain() {
  document.getElementById('next-round').style.display = '';
  document.getElementById('countdown').style.display = '';
  stopAnimation = false;
  context.clearRect(0 ,0, canvas.width, canvas.height);
  gameGrid();
  resetBikes();
  counter = 3;
  countdown();
};

function resetBikes() {
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

function countdown() {
  switch (counter) {
    case 3:
      animationTimer = document.querySelector('input[name="speed"]:checked').value;
      hideTitleScreen('start-button');
      hideTitleScreen('title-screen');
      document.getElementById('countdown').style.display  = '';
      displayCountdown(3);
      counter--;
      countdownTimer = setTimeout(countdown, 1000);
      return;
      break;
    case 2:
      displayCountdown(2);
      counter--;
      setTimeout(countdown, 1000);
      return;
      break;
    case 1:
      displayCountdown(1);
      counter--;
      setTimeout(countdown, 1000);
      return;
      break;
    case 0:
      hideTitleScreen('countdown');
      animate();
      return;
      break;
  };
};

function displayCountdown(counter) {
  clearTimeout(countdownTimer);
  document.getElementById('countdown').innerText = counter;
};

function hideTitleScreen(piece) {
  switch (piece) {
    case 'start-button': document.getElementById('start-game').style.display = 'none'; break;
    case 'title-screen': document.getElementById('title-screen').style.display = 'none'; break;
    case 'countdown':    document.getElementById('countdown').style.display = 'none'; break;
  };
};

function gameGrid() {
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
  };
};

document.addEventListener('keydown', (key) => {
  let directionCode = key.keyCode;
  switch (directionCode) {
    case 37: bikeOne.move('left'); break;
    case 38: bikeOne.move('up'); break;
    case 39: bikeOne.move('right'); break;
    case 40: bikeOne.move('down'); break;
    case 65: bikeTwo.move('left'); break;
    case 87: bikeTwo.move('up'); break;
    case 68: bikeTwo.move('right'); break;
    case 83: bikeTwo.move('down'); break;
  };
});

function movementBikeOne() {
  switch (bikeOne.direction) {
    case 'left':  bikeOne.locationX -= bikeOne.size; break;
    case 'up':    bikeOne.locationY -= bikeOne.size; break;
    case 'right': bikeOne.locationX += bikeOne.size; break;
    case 'down':  bikeOne.locationY += bikeOne.size; break;
  };
};

function movementBikeTwo() {
  switch (bikeTwo.direction) {
    case 'left':  bikeTwo.locationX -= bikeTwo.size; break;
    case 'up':    bikeTwo.locationY -= bikeTwo.size; break;
    case 'right': bikeTwo.locationX += bikeTwo.size; break;
    case 'down':  bikeTwo.locationY += bikeTwo.size; break;
  };
};

function victoryCheck () {
  if(bikeOne.lives === 0) {
      document.getElementById('victory-screen').style.display = 'block';
      document.getElementById('final-score').innerText = "Blue player wins!";
      resetAll();
      return;
  }
  else if(bikeTwo.lives === 0) {
      document.getElementById('victory-screen').style.display = 'block';
      document.getElementById('final-score').innerText = "Orange player wins!";
      resetAll();
      return;
  }
  else {
      nextRound();
      return;
  }
}

function resetAll () {
  context.clearRect(0 ,0, canvas.width, canvas.height);
  coordinateArray = [];
  // animationTimer = 100;
  gameGrid();
  resetBikes();
  document.querySelector('#new-game').addEventListener('click', function() {
    document.getElementById('victory-screen').style.display = '';
    document.getElementById('next-round').style.display     = '';
    document.getElementById('title-screen').style.display   = '';
    document.getElementById('start-game').style.display     = '';
    beginning();
    return;
  });
  return;
}

function animate() {
  clearTimeout(framerate);
  bikeOne.draw(context);
  bikeTwo.draw(context);
  bikeOne.TravelTracker(coordinateArray);
  bikeTwo.TravelTracker(coordinateArray);
  movementBikeOne();
  movementBikeTwo();
  stopAnimation = bikeOne.youDie(coordinateArray, stopAnimation);
  stopAnimation = bikeTwo.youDie(coordinateArray, stopAnimation);
  if (stopAnimation){
    victoryCheck();
    return;
  } else {
    framerate = setTimeout(animate, animationTimer);
    return;
  }
}

gameGrid();
beginning();

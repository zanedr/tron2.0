var Bike = require('./bikes.js');
var stopAnimation = require('./bikes.js');
var coordinateArray = coordinateArray || []

var canvas = document.getElementById('gameGrid');
var context = canvas.getContext('2d');

var animation = true;
var lives = 3;

var counter = 3;
// var stopAnimation;

var bikeOne = new Bike(950, 275, 10, 'rgb(223,116,12)', 'left');
var bikeTwo = new Bike(50, 275, 10, 'rgb(34,218,222)', 'right');

document.querySelector('#start-game').addEventListener('click', function() {
  stopAnimation = false;
  countdown();
});

function nextRound() {
  document.getElementById('next-round').style.display = 'block';
  document.getElementById('bike-one-lives').innerText = bikeOne.lives;
  document.getElementById('bike-two-lives').innerText = bikeTwo.lives;
  document.getElementById('next-round-button').addEventListener('click', function() {
    coordinateArray = [];
    goAgain();
  })
}

function goAgain() {
  document.getElementById('next-round').style.display = '';
  document.getElementById('countdown').style.display = '';
  stopAnimation = false;
  resetBikes();
  context.clearRect(0 ,0, canvas.height, canvas.width);
  gameGrid();
  // console.log(bikeOne.lives, bikeTwo.lives)
  // console.log('eh?')
  countdown();
}

function resetBikes() {
  bikeOne.locationX = 950;
  bikeOne.locationY = 275;
  bikeOne.direction = "left";
  bikeTwo.locationX = 50;
  bikeTwo.locationY = 275;
  bikeTwo.direction = "right";
}

function countdown() {
  switch (counter) {
    case 3:
      hideTitleScreen('start-button');
      hideTitleScreen('title-screen');
      displayCountdown(3);
      counter--;
      setTimeout(countdown, 1000);
      break;
    case 2:
      displayCountdown(2);
      counter--;
      setTimeout(countdown, 1000);
      break;
    case 1:
      displayCountdown(1);
      counter--;
      setTimeout(countdown, 1000);
      break;
    case 0:
      hideTitleScreen('countdown');
      var startAnimation = setTimeout(animate, 100);
      break;
  }
}

function displayCountdown(counter) {
  document.getElementById('countdown').innerText = counter;
}

function hideTitleScreen(piece) {
  switch (piece) {
    case 'start-button': document.getElementById('start-game').style.display = 'none'; break;
    case 'title-screen': document.getElementById('title-screen').style.display = 'none'; break;
    case 'countdown':    document.getElementById('countdown').style.display = 'none'; break;
  }
}

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

document.addEventListener('keydown', function(key) {
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
  }
})

function movementBikeOne() {
  switch (bikeOne.direction) {
    case 'left':  bikeOne.locationX -= bikeOne.size; break;
    case 'up':    bikeOne.locationY -= bikeOne.size; break;
    case 'right': bikeOne.locationX += bikeOne.size; break;
    case 'down':  bikeOne.locationY += bikeOne.size; break;
  }
}

function movementBikeTwo() {
  switch (bikeTwo.direction) {
    case 'left':  bikeTwo.locationX -= bikeTwo.size; break;
    case 'up':    bikeTwo.locationY -= bikeTwo.size; break;
    case 'right': bikeTwo.locationX += bikeTwo.size; break;
    case 'down':  bikeTwo.locationY += bikeTwo.size; break;
  }
}

function victoryCheck() {
  if(bikeOne.lives === 0) {
    alert('Player Two Wins')
  }
  if(bikeTwo.lives === 0) {
    alert('Player One Wins')
  }
return 'gameover;'
}

function animate() {
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
    nextRound();
    return 'gameover';
  }
  setTimeout(animate, 100);
}

gameGrid();

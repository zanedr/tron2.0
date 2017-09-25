/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _bikeTwoAI = __webpack_require__(1);

	var _bikeTwoAI2 = _interopRequireDefault(_bikeTwoAI);

	var _Bike = __webpack_require__(2);

	var _Bike2 = _interopRequireDefault(_Bike);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.getElementById('gameGrid');
	var context = canvas.getContext('2d');

	var countdownID = document.getElementById('countdown');
	var startGameID = document.getElementById('start-game');
	var nextRoundID = document.getElementById('next-round');
	var nextRoundButtonID = document.getElementById('next-round-button');
	var titleScreenID = document.getElementById('title-screen');
	var victoryScreenID = document.getElementById('victory-screen');
	var finalScoreID = document.getElementById('final-score');
	var bikeOneLivesID = document.getElementById('bike-one-lives');
	var bikeTwoLivesID = document.getElementById('bike-two-lives');

	var stopAnimation = __webpack_require__(2);
	var coordinateArray = void 0;

	var animationTimer = void 0;
	var framerate = void 0;
	var countdownTimer = void 0;
	var stopAnimation1 = false;
	var stopAnimation2 = false;
	var victoryCheckTimer = void 0;

	var numberOfPlayers = void 0;

	var bikeOne = new _Bike2.default(940, 270, 10, 'rgb(223,116,12)', 'left', 3);
	var bikeTwo = new _Bike2.default(50, 270, 10, 'rgb(34,218,222)', 'right', 3);
	var counter = void 0;
	var deathCounter = 0;
	var deathTimer = void 0;
	var explosionX = void 0;
	var explosionY = void 0;

	var beginning = function beginning() {
	  coordinateArray = [];
	  startGameID.addEventListener('click', function () {
	    counter = 3;
	    deathCounter = 0;
	    stopAnimation = false;
	    countdown();
	    gamePrep();
	  });
	};

	var nextRound = function nextRound() {
	  nextRoundID.style.display = 'block';
	  bikeOneLivesID.innerText = bikeOne.lives;
	  bikeTwoLivesID.innerText = bikeTwo.lives;
	  nextRoundButtonID.addEventListener('click', function () {
	    coordinateArray = [];
	    goAgain();
	  });
	};

	var goAgain = function goAgain() {
	  nextRoundID.style.display = '';
	  countdownID.style.display = '';
	  stopAnimation = false;
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  gameGrid();
	  counter = 3;
	  deathCounter = 0;
	  countdown();
	  gamePrep();
	};

	var resetBikes = function resetBikes() {
	  bikeOne.locationX = 940;
	  bikeOne.locationY = 270;
	  bikeOne.direction = "left";
	  bikeTwo.locationX = 50;
	  bikeTwo.locationY = 270;
	  bikeTwo.direction = "right";
	  if (bikeOne.lives === 0 || bikeTwo.lives === 0) {
	    bikeOne.lives = 3;
	    bikeTwo.lives = 3;
	  }
	};

	var gamePrep = function gamePrep() {
	  resetBikes();
	  animationTimer = document.querySelector('input[name="speed"]:checked').value;
	  numberOfPlayers = document.querySelector('input[name="players"]:checked').value;
	  hideTitleScreen(startGameID);
	  hideTitleScreen(titleScreenID);
	  countdownID.style.display = '';
	};

	var countdown = function countdown() {
	  if (counter === 0) {
	    hideTitleScreen(countdownID);
	    animate();
	  } else {
	    displayCountdown();
	  }
	};

	var displayCountdown = function displayCountdown() {
	  clearTimeout(countdownTimer);
	  countdownID.innerText = counter;
	  counter--;
	  countdownTimer = setTimeout(countdown, 1000);
	};

	var hideTitleScreen = function hideTitleScreen(obj) {
	  obj.style.display = 'none';
	};

	var gameGrid = function gameGrid() {
	  context.fillStyle = "rgb(28, 59, 73)";
	  context.fillRect(0, 0, 1000, 550);
	  for (var i = 0; i < 1000; i += 50) {
	    context.lineWidth = 2;
	    context.beginPath();
	    context.moveTo(i, 0);
	    context.lineTo(i, 550);
	    context.moveTo(0, i);
	    context.lineTo(1000, i);
	    context.strokeStyle = "rgb(230,222,235)";
	    context.stroke();
	  }
	};

	document.addEventListener('keydown', function (key) {
	  var directionCode = key.keyCode;

	  switch (directionCode) {
	    case 37:
	      bikeOne.checkDirection('left');break;
	    case 38:
	      bikeOne.checkDirection('up');break;
	    case 39:
	      bikeOne.checkDirection('right');break;
	    case 40:
	      bikeOne.checkDirection('down');break;
	    case 65:
	      bikeTwo.checkDirection('left');break;
	    case 87:
	      bikeTwo.checkDirection('up');break;
	    case 68:
	      bikeTwo.checkDirection('right');break;
	    case 83:
	      bikeTwo.checkDirection('down');break;
	  }
	});

	var victoryCheck = function victoryCheck() {
	  if (bikeOne.lives === 0 && bikeTwo.lives === 0) {
	    displayVictor("Tie! How'd you manage that?");
	  } else if (bikeOne.lives === 0) {
	    displayVictor("Blue player wins!");
	  } else if (bikeTwo.lives === 0) {
	    displayVictor("Orange player wins!");
	  } else {
	    nextRound();
	    return;
	  }
	};

	var displayVictor = function displayVictor(winner) {
	  victoryScreenID.style.display = 'block';
	  finalScoreID.innerText = winner;
	  resetAll();
	  return;
	};

	var resetAll = function resetAll() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  coordinateArray = [];
	  gameGrid();
	  resetBikes();
	  document.querySelector('#new-game').addEventListener('click', function () {
	    victoryScreenID.style.display = '';
	    nextRoundID.style.display = '';
	    titleScreenID.style.display = '';
	    startGameID.style.display = '';
	    beginning();
	    return;
	  });
	  return;
	};

	var animate = function animate() {
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
	    (0, _bikeTwoAI2.default)(bikeTwo, coordinateArray);
	  }
	  if (stopAnimation1 || stopAnimation2) {
	    deathSign();
	    return;
	  } else {
	    framerate = setTimeout(animate, animationTimer);
	    return;
	  }
	};

	var deathSign = function deathSign() {
	  clearTimeout(victoryCheckTimer);
	  if (stopAnimation1) {
	    explosionX = bikeOne.locationX + 5;
	    explosionY = bikeOne.locationY + 5;
	    drawDeath();
	  }
	  if (stopAnimation2) {
	    explosionX = bikeTwo.locationX + 5;
	    explosionY = bikeTwo.locationY + 5;
	    drawDeath();
	  }
	  victoryCheckTimer = setTimeout(victoryCheck, 2000);
	};

	var drawDeath = function drawDeath() {
	  clearTimeout(deathTimer);
	  if (deathCounter < 7) {
	    var explosionSize = deathCounter * 5;

	    context.beginPath();
	    context.fillStyle = "rgb(253,169,41)";
	    context.arc(explosionX, explosionY, explosionSize, 0, 6.28, false);
	    context.fill();
	    deathCounter++;
	    deathTimer = setTimeout(drawDeath, 35);
	  } else if (deathCounter < 15) {
	    var _explosionSize = (deathCounter - 7) * 5;

	    context.beginPath();
	    context.fillStyle = "rgb(28, 59, 73)";
	    context.arc(explosionX, explosionY, _explosionSize, 0, 6.28, false);
	    context.fill();
	    deathCounter++;
	    deathTimer = setTimeout(drawDeath, 35);
	  } else {
	    return;
	  }
	};

	gameGrid();
	beginning();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = playerTwoAI;
	var playerTwoTimer = void 0;
	var bikeTwo = void 0;
	var coordinateArray = [];

	function playerTwoAI(importBikeTwo, importCoordinateArray) {
	  bikeTwo = importBikeTwo;
	  coordinateArray = importCoordinateArray;
	  clearTimeout(playerTwoTimer);
	  coordinateArray.find(function (locale) {
	    if (bikeTwo.direction == 'up' && bikeTwo.locationY < 40 || bikeTwo.direction == 'down' && bikeTwo.locationY > 510) {
	      evaluateVertical();
	    }

	    if (bikeTwo.direction == 'left' && bikeTwo.locationX < 40 || bikeTwo.direction == 'right' && bikeTwo.locationX > 960) {
	      evaluateHorizontal();
	    }

	    if (bikeTwo.direction == 'left' && (checkWalls(locale, -30, 0) || checkWalls(locale, -20, 0) || checkWalls(locale, -10, 0))) {
	      evaluateHorizontal();
	      // console.log('left trigger')
	    }

	    if (bikeTwo.direction == 'right' && (checkWalls(locale, 30, 0) || checkWalls(locale, 20, 0) || checkWalls(locale, 10, 0))) {
	      evaluateHorizontal();
	      // console.log('right trigger')
	    }

	    if (bikeTwo.direction == 'up' && (locale === bikeTwo.locationX + "," + (bikeTwo.locationY - 30) || locale === bikeTwo.locationX + "," + (bikeTwo.locationY - 20) || locale === bikeTwo.locationX + "," + (bikeTwo.locationY - 10))) {
	      evaluateVertical();
	      // console.log('up trigger')
	    }

	    if (bikeTwo.direction == 'down' && (locale === bikeTwo.locationX + "," + (bikeTwo.locationY + 30) || locale === bikeTwo.locationX + "," + (bikeTwo.locationY + 20) || locale === bikeTwo.locationX + "," + (bikeTwo.locationY + 10))) {
	      evaluateVertical();
	      // console.log('down trigger')
	    }
	  });
	}

	function checkWalls(locale, a, b) {
	  if (locale === bikeTwo.locationX + a + ',' + (bikeTwo.locationY + b)) {
	    return true;
	  }
	}

	var evaluateHorizontal = function evaluateHorizontal() {
	  coordinateArray.find(function (locale) {
	    if (locale === bikeTwo.locationX + "," + (bikeTwo.locationY + 20) || locale === bikeTwo.locationX + "," + (bikeTwo.locationY + 10)) {
	      // console.log('response up')
	      bikeTwo.direction = 'up';
	      return bikeTwo.direction;
	    } else if (locale === bikeTwo.locationX + "," + (bikeTwo.locationY - 20) || locale === bikeTwo.locationX + "," + (bikeTwo.locationY - 10)) {
	      // console.log('response down')
	      bikeTwo.direction = "down";
	      return bikeTwo.direction;
	    } else if (bikeTwo.locationX < 50 || bikeTwo.locationX > 950) {
	      var newDirection = Math.round(Math.random());

	      switch (newDirection) {
	        case 0:
	          bikeTwo.direction = "up";
	          return bikeTwo.direction;
	        case 1:
	          bikeTwo.direction = "down";
	          return bikeTwo.direction;
	      }
	    } else {
	      var _newDirection = Math.round(Math.random());

	      // console.log('random horizontal')
	      switch (_newDirection) {
	        case 0:
	          bikeTwo.direction = "up";
	          return bikeTwo.direction;
	        case 1:
	          bikeTwo.direction = "down";
	          return bikeTwo.direction;
	      }
	    }
	  });
	};

	var evaluateVertical = function evaluateVertical() {
	  coordinateArray.find(function (locale) {
	    if (locale === bikeTwo.locationX + 20 + "," + bikeTwo.locationY || locale === bikeTwo.locationX + 10 + "," + bikeTwo.locationY) {

	      // console.log('response left')
	      bikeTwo.direction = 'left';
	      return bikeTwo.direction;
	    } else if (locale === bikeTwo.locationX - 20 + "," + bikeTwo.locationY || locale === bikeTwo.locationX - 10 + "," + bikeTwo.locationY) {

	      // console.log('response right')
	      bikeTwo.direction = "right";
	      return bikeTwo.direction;
	    } else if (bikeTwo.locationY <= 50 || bikeTwo.locationY >= 500) {
	      var newDirection = Math.round(Math.random());

	      // console.log('random vertical')
	      switch (newDirection) {
	        case 0:
	          bikeTwo.direction = "right";
	          return bikeTwo.direction;
	        case 1:
	          bikeTwo.direction = "left";
	          return bikeTwo.direction;
	      }
	    } else {
	      var _newDirection2 = Math.round(Math.random());

	      // console.log('random vertical')
	      switch (_newDirection2) {
	        case 0:
	          bikeTwo.direction = "right";
	          return bikeTwo.direction;
	        case 1:
	          bikeTwo.direction = "left";
	          return bikeTwo.direction;
	      }
	    }
	  });
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bike = function () {
	  function Bike(locationX, locationY, size, color, direction, lives) {
	    _classCallCheck(this, Bike);

	    this.locationX = locationX;
	    this.locationY = locationY;
	    this.size = size;
	    this.color = color;
	    this.direction = direction;
	    this.lives = lives || 3;
	  }

	  _createClass(Bike, [{
	    key: "draw",
	    value: function draw(context) {
	      context.fillStyle = this.color;
	      context.fillRect(this.locationX, this.locationY, this.size, this.size);
	      return this;
	    }
	  }, {
	    key: "checkDirection",
	    value: function checkDirection(proposedDirection) {
	      var checkDirection = void 0;

	      if (proposedDirection == "left") {
	        checkDirection = "right";
	      } else if (proposedDirection == "right") {
	        checkDirection = "left";
	      } else if (proposedDirection == "up") {
	        checkDirection = "down";
	      } else if (proposedDirection == "down") {
	        checkDirection = "up";
	      }
	      this.evaluateDirection(checkDirection, proposedDirection);
	    }
	  }, {
	    key: "evaluateDirection",
	    value: function evaluateDirection(checkDirection, proposedDirection) {
	      if (checkDirection != this.direction) {
	        this.direction = proposedDirection;
	      }
	    }
	  }, {
	    key: "move",
	    value: function move(direction) {
	      switch (direction) {
	        case 'left':
	          this.locationX -= this.size;break;
	        case 'up':
	          this.locationY -= this.size;break;
	        case 'right':
	          this.locationX += this.size;break;
	        case 'down':
	          this.locationY += this.size;break;
	      }
	    }
	  }, {
	    key: "travelTracker",
	    value: function travelTracker(coordinateArray) {
	      coordinateArray.push(this.locationX + "," + this.locationY);
	    }
	  }, {
	    key: "youDie",
	    value: function youDie(coordinateArray, stopAnimation) {
	      var hereIAm = this.locationX + "," + this.locationY;
	      var player = this;

	      if (this.locationX <= -10 || this.locationX >= 1000 || this.locationY <= -10 || this.locationY >= 550) {
	        this.lives--;
	        stopAnimation = true;
	      }
	      coordinateArray.find(function (locale) {
	        if (locale === hereIAm) {
	          player.lives--;
	          stopAnimation = true;
	        }
	      });
	      return stopAnimation;
	    }
	  }]);

	  return Bike;
	}();

	exports.default = Bike;

/***/ }
/******/ ]);
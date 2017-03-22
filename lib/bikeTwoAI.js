let playerTwoTimer;
let bikeTwo;
let coordinateArray = [];

export default function playerTwoAI (importBikeTwo, importCoordinateArray) {
  bikeTwo = importBikeTwo
  coordinateArray = importCoordinateArray;
  clearTimeout(playerTwoTimer);
  coordinateArray.find(function(locale) {
    if ((bikeTwo.direction == 'up' && bikeTwo.locationY < 40) || (bikeTwo.direction == 'down' && bikeTwo.locationY > 510)) {
      evaluateVertical();
    }

    if ((bikeTwo.direction == 'left' && bikeTwo.locationX < 40) || (bikeTwo.direction == 'right' && bikeTwo.locationX > 960)) {
      evaluateHorizontal();
    }

    if (bikeTwo.direction == 'left' && (locale === ((bikeTwo.locationX - 30) + "," + bikeTwo.locationY) ||
                                        locale === ((bikeTwo.locationX - 20) + "," + bikeTwo.locationY) ||
                                        locale === ((bikeTwo.locationX - 10) + "," + bikeTwo.locationY))) {
      evaluateHorizontal();
      // console.log('left trigger')
    }

    if (bikeTwo.direction == 'right' && (locale === ((bikeTwo.locationX + 30) + "," + bikeTwo.locationY) ||
                                         locale === ((bikeTwo.locationX + 20) + "," + bikeTwo.locationY) ||
                                         locale === ((bikeTwo.locationX + 10) + "," + bikeTwo.locationY))) {
      evaluateHorizontal();
      // console.log('right trigger')
    }

    if (bikeTwo.direction == 'up' && (locale === (bikeTwo.locationX + "," + (bikeTwo.locationY - 30)) ||
                                      locale === (bikeTwo.locationX + "," + (bikeTwo.locationY - 20)) ||
                                      locale === (bikeTwo.locationX + "," + (bikeTwo.locationY - 10)))) {
      evaluateVertical();
      // console.log('up trigger')
    }

    if (bikeTwo.direction == 'down' && (locale === (bikeTwo.locationX + "," + (bikeTwo.locationY + 30)) ||
                                        locale === (bikeTwo.locationX + "," + (bikeTwo.locationY + 20)) ||
                                        locale === (bikeTwo.locationX + "," + (bikeTwo.locationY + 10)))) {
      evaluateVertical();
      // console.log('down trigger')
    }
  });
}

const evaluateHorizontal = () => {
  coordinateArray.find(function(locale) {
    if (locale === bikeTwo.locationX + "," + (bikeTwo.locationY + 20) ||
        locale === bikeTwo.locationX + "," + (bikeTwo.locationY + 10)) {
          // console.log('response up')
      bikeTwo.direction = 'up'
      return bikeTwo.direction;
    }
    else if (locale === bikeTwo.locationX + "," + (bikeTwo.locationY - 20) ||
             locale === bikeTwo.locationX + "," + (bikeTwo.locationY - 10)) {
          // console.log('response down')
      bikeTwo.direction = "down";
      return bikeTwo.direction;
    }
    else if (bikeTwo.locationX < 50 || bikeTwo.locationX > 950) {
      let newDirection = Math.round(Math.random());

      switch (newDirection) {
        case 0:
          bikeTwo.direction = "up";
          return bikeTwo.direction;
        case 1:
          bikeTwo.direction = "down"
          return bikeTwo.direction;
      }

    } else {
      let newDirection = Math.round(Math.random());

      // console.log('random horizontal')
      switch (newDirection) {
        case 0:
          bikeTwo.direction = "up";
          return bikeTwo.direction;
        case 1:
          bikeTwo.direction = "down"
          return bikeTwo.direction;
      }
    }
  })
}

const evaluateVertical = () => {
  coordinateArray.find(function(locale) {
    if (locale === ((bikeTwo.locationX + 20) + "," + bikeTwo.locationY) ||
        locale === ((bikeTwo.locationX + 10) + "," + bikeTwo.locationY)) {

      // console.log('response left')
      bikeTwo.direction = 'left'
      return bikeTwo.direction;
    }
    else if (locale === ((bikeTwo.locationX - 20) + "," + bikeTwo.locationY) ||
             locale === ((bikeTwo.locationX - 10) + "," + bikeTwo.locationY)) {

      // console.log('response right')
      bikeTwo.direction = "right";
      return bikeTwo.direction;
    }
    else if (bikeTwo.locationY <= 50 || bikeTwo.locationY >= 500) {
      let newDirection = Math.round(Math.random());

      // console.log('random vertical')
      switch (newDirection) {
        case 0:
          bikeTwo.direction = "right";
          return bikeTwo.direction;
        case 1:
          bikeTwo.direction = "left"
          return bikeTwo.direction;
      }

    } else {
      let newDirection = Math.round(Math.random());

      // console.log('random vertical')
      switch (newDirection) {
        case 0:
          bikeTwo.direction = "right";
          return bikeTwo.direction;
        case 1:
          bikeTwo.direction = "left"
          return bikeTwo.direction;
      }
    }
  });
}

export default class Bike {
  constructor(locationX, locationY, size, color, direction, lives) {
    this.locationX = locationX;
    this.locationY = locationY;
    this.size = size;
    this.color = color;
    this.direction = direction;
    this.lives = lives || 3
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.locationX, this.locationY, this.size, this.size);
    return this;
  }

  checkDirection(proposedDirection) {
    let checkDirection;

    if (proposedDirection == "left") {
      checkDirection = "right";
    } else if (proposedDirection == "right") {
      checkDirection = "left";
    } else if (proposedDirection == "up") {
      checkDirection = "down";
    } else if (proposedDirection == "down") {
      checkDirection = "up"
    }
    this.evaluateDirection(checkDirection, proposedDirection);
  }

  evaluateDirection(checkDirection, proposedDirection) {
    if (checkDirection != this.direction ) {
      this.direction = proposedDirection;
    }
  }

  move(direction) {
    switch (direction) {
      case 'left':  this.locationX -= this.size; break;
      case 'up':    this.locationY -= this.size; break;
      case 'right': this.locationX += this.size; break;
      case 'down':  this.locationY += this.size; break;
    }
  }

  travelTracker(coordinateArray) {
    coordinateArray.push(this.locationX + "," + this.locationY);
  }

  youDie(coordinateArray, stopAnimation) {
    let hereIAm = (this.locationX + "," + this.locationY);
    let player = this;

    if (this.locationX <= -10 ||
        this.locationX >= 1000 ||
        this.locationY <= -10 ||
        this.locationY >= 550) {
      this.lives--;
      stopAnimation = true;
    }
    coordinateArray.find(function(locale) {
      if (locale === hereIAm) {
        player.lives--;
        stopAnimation = true;
      }
    });
    return stopAnimation;
  }
}

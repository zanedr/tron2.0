class Bike {
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

  move(direction) {
    switch (direction) {
    case 'left':  this.direction = 'left'; break;
    case 'up':    this.direction = 'up'; break;
    case 'right': this.direction = 'right'; break;
    case 'down':  this.direction = 'down'; break;
    }
  }

  travelTracker(coordinateArray) {
    coordinateArray.push(this.locationX + "," + this.locationY);
  }

  youDie(coordinateArray, stopAnimation) {
    let hereIAm = (this.locationX + "," + this.locationY);
    let life = this;

    coordinateArray.find(function(locale) {
      if (locale === hereIAm) {
        life.lives--;
        stopAnimation = true;
      }
    });
    return stopAnimation;
  }
}

module.exports = Bike
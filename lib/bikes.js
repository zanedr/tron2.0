function Bike(locationX, locationY, size, color, direction, lives) {
  this.locationX = locationX;
  this.locationY = locationY;
  this.size = size;
  this.color = color;
  this.direction = direction;
  this.lives = lives || 3;
}

Bike.prototype.draw = function(context) {
  context.fillStyle = this.color;
  context.fillRect(this.locationX, this.locationY, this.size, this.size);
  return this;
}

Bike.prototype.move = function(direction) {
  switch (direction) {
    case 'left':  this.direction = 'left'; break
    case 'up':    this.direction = 'up'; break
    case 'right': this.direction = 'right'; break
    case 'down':  this.direction = 'down'; break
  }
}

Bike.prototype.TravelTracker = function(coordinateArray) {
  coordinateArray.push(this.locationX + "," + this.locationY);
}

Bike.prototype.youDie = function(coordinateArray, stopAnimation) {
  let hereIAm = (this.locationX + "," + this.locationY);
  let player = this;
  if (this.locationX === -10 ||
      this.locationX === 1000 ||
      this.locationY === -10 ||
      this.locationY === 550) {
        this.lives--;
        stopAnimation = true
      }
  coordinateArray.find(function(locale) {
    if (locale === hereIAm) {
      player.lives--;
      stopAnimation = true;
    };
  });
  return stopAnimation;
}

module.exports = Bike;

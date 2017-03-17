function Bike(locationX, locationY, size, color, direction, stopAnimation) {
  this.locationX = locationX
  this.locationY = locationY
  this.size = size
  this.color = color
  this.direction = direction
  // this.lives = false
  // this.animation = false
}

Bike.prototype.draw = function(context) {
  context.fillStyle = this.color
  context.fillRect(this.locationX, this.locationY, this.size, this.size)
  return this
}

Bike.prototype.move = function(direction) {
  switch (direction) {
    case 'left': this.direction = 'left'; break
    case 'up': this.direction = 'up'; break
    case 'right': this.direction = 'right'; break
    case 'down': this.direction = 'down'; break
  }
}

Bike.prototype.TravelTracker = function(coordinateArray) {
  coordinateArray.push(this.locationX + "," + this.locationY)
}

Bike.prototype.youDie = function(coordinateArray,lives,animation) {
  var lives = lives
  var animation = animation
  // console.log(lives, 'lives')
  // console.log(animation, 'animation')
  let hereIAm = (this.locationX + "," + this.locationY)
  var animateLife;

  coordinateArray.find(function(locale) {
    if (locale === hereIAm) {
      lives--
      animation = false
    }
  })

  return animateLife = {lives:lives, animate:animation};
  return animateLife;
  console.log(animateLife)
}

module.exports = Bike

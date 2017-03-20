function Bike(locationX, locationY, size, color, direction) {
  this.locationX = locationX
  this.locationY = locationY
  this.size = size
  this.color = color
  this.direction = direction
  this.lives = 3
  this.animation = true
  this.coordinateArray = []
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

Bike.prototype.youDie = function(coordinateArray) {
  let hereIAm = (this.locationX  + "," + this.locationY)

  coordinateArray.find(function(locale,hereIAm) {
    if (locale == hereIAm) {
      this.lives--
      this.animation = false
    }
  })
}

module.exports = Bike

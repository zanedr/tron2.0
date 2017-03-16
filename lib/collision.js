var Bike = require('./index.js')

// console.log(Bike, 'Bike.locationY')

let coordinateArray = coordinateArray || []
function TravelTracker(Bike) {
  coordinateArray.push({x:Bike.locationX, y:Bike.locationY})
  console.log(coordinateArray, 'coordinateArray')

  coordinateArray = coordinateArray.map(function(coordinate) {

  if(coordinate.x !== Bike.locationX || coordinate.y !== Bike.locationY) {
    return {x:Bike.locationX, y:Bike.locationY}
  } else {
    // gameEnd()
    // lifeStock()
    }
  })
}

// TravelTracker.prototype.hitWall = function(coordinate) {
//
//   switch(Bike.locationX) {
//     case canvas.width: Bike.locationX = 0; break
//     case 0: Bike.locationX = canvas.width; break
//   }
//
//   switch(Bike.locationY) {
//     case canvas.height: Bike.locationY = 0; break
//     case 0: Bike.locationY = canvas.height; break
//   }
// }

module.exports = TravelTracker

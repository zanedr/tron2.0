const assert = require('chai').assert
const Bike = require('../lib/bikes.js')

describe('Analyze the Bike()', () => {

  it('should be a function', ()=> {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.isFunction(Bike)
  })

  it('should have properties', () => {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.equal(bike.locationX, 5)
    assert.equal(bike.locationY, 10)
    assert.equal(bike.size, 'large')
    assert.equal(bike.color, 'red')
    assert.equal(bike.direction, 'up')
  })

  it('should be a constructor function', ()=> {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.instanceOf(bike, Bike, 'is an instance of bike')
  })

  it.skip('should have the following properties', () => {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.property( {locationX: {locationX:5} } )
  })

  it('should have a draw function', () => {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.isFunction(bike.draw, 'sup yo')
  })

  it('should be a function', ()=> {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.isFunction(bike.move)
  })

  it('should have a TravelTracker function', ()=> {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.isFunction(bike.TravelTracker)
  })

  it('should produce an array', ()=> {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.isArray(bike.coordinateArray)
  })

  it('should be a function', ()=> {
    var bike = new Bike(5,10,'large','red','up',true)

    assert.isFunction(bike.youDie)
  })

})

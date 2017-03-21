const assert = require('chai').assert;
const Bike = require('../lib/bikeses6.js');

describe('Analyze the Bike()', () => {

  it('should be a function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike)
  })

  it('should have properties', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.equal(bike.locationX, 5)
    assert.equal(bike.locationY, 10)
    assert.equal(bike.size, 'large')
    assert.equal(bike.color, 'red')
    assert.equal(bike.direction, 'up')
  })

  it('should have three lives by default', () => {
    var bike = new Bike()

    assert.equal(bike.lives, 3)
  })

  it.skip('should have as many lives as are passed in', () => {
    var bike = new Bike(0, 0, 0, 0, 0, 5)

    assert.equal(bike.lives, 5)
  })

  it('should be a constructor function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.instanceOf(bike, Bike, 'is an instance of bike')
  })

  it.skip('should have the following properties', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.property( {locationX: {locationX: 5} } )
  })

  it('should have a draw function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike.draw, 'sup yo')
  })

  it.skip('should be an instance of Bike', () => {
    var bike = new Bike()

    assert.instanceOf(bike.draw, bike)
  })

  it('should be a function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike.move)
  })

  it('should have a TravelTracker function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike.TravelTracker)
  })

  it.skip('should return an array', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    let testArray = [1, 2, 3]

    bike.travelTracker(testArray)
    assert.isArray(testArray)
  })

  it('should be a function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike.youDie)
  })
})

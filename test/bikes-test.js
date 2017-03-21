const assert = require('chai').assert;
const Bike = require('../lib/bikeses6.js');

describe('Analyze the Bike()', () => {

  it('1: should be a constructor', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isObject(bike)
  })

  it('2: should have properties', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.equal(bike.locationX, 5)
    assert.equal(bike.locationY, 10)
    assert.equal(bike.size, 'large')
    assert.equal(bike.color, 'red')
    assert.equal(bike.direction, 'up')
  })

  it('3: should have three lives by default', () => {
    var bike = new Bike()

    assert.equal(bike.lives, 3)
  })

  it('4: should have as many lives as are passed in', () => {
    var bike = new Bike(0, 0, 0, 0, 0, 5)

    assert.equal(bike.lives, 5)
  })

  it('5: should be a constructor function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.instanceOf(bike, Bike, 'is an instance of bike')
  })

  it('6: should have the following properties', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.property(bike, 'locationX')
    assert.property(bike, 'locationY')
    assert.property(bike, 'size')
    assert.property(bike, 'color')
    assert.property(bike, 'direction')
    assert.property(bike, 'lives')
  })

  it('6.1: should not have the following properties', () => {
    var bike = new Bike()

    assert.notProperty(bike, 'foo')
  })

  it('7: should have a draw function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike.draw)
  })

  it('8: should be an instance of Bike', () => {
    var bike = new Bike()

    assert.instanceOf(bike, Bike)
  })

  it('9: should be a function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike.move)
  })

  it('10: should have a travelTracker function', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    assert.isFunction(bike.travelTracker)
  })

  it('11: should lose a life when it leaves the game grid', () => {
    var bike = new Bike(1000, 3, 10, 'red', 'up')

    let stopAnimation = false
    let testArrayOne = []

    assert.equal(bike.lives, 3)
    bike.youDie(testArrayOne, stopAnimation)
    assert.isArray(testArrayOne)
    assert.equal(bike.lives, 2)
  })

  it('12: should lose a life when it the location arrays are identical', () => {
    var bike = new Bike(10, 30, 10, 'red', 'up')

    let stopAnimation = false
    let testArrayOne = ["10,30"]

    bike.youDie(testArrayOne, stopAnimation)
    assert.isArray(testArrayOne)
    assert.equal(bike.lives, 2)
  })

  it('13: should move in respone to input', () => {
    var bike = new Bike(5, 10, 'large', 'red', 'up', true)

    bike.move("down")
    assert.equal(bike.direction, "down")
    bike.move("left")
    assert.equal(bike.direction, "left")
    bike.move("up")
    assert.equal(bike.direction, "up")
    bike.move("right")
    assert.equal(bike.direction, "right")
  })
})

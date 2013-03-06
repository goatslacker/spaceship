// Based on Dave Bollinger`s work


// blocks that are always empty
var empty = [
  [0, 0], [1, 0], [2, 0], [3, 0],
  [0, 1], [1, 1], [2, 1],
  [0, 2], [1, 2], [2, 2],
  [0, 3], [1, 3],
  [0, 4], [1, 4],
  [0, 5]
]

// blocks that are always solid
var solid = [
  [5, 2], [5, 3], [5, 4], [5, 9]
]

// blocks that form the cockpit, can be 1/0
var cockpit = [
  [4, 5], [4, 6], [4, 7],
  [5, 5], [5, 6], [5, 7]
]

// blocks that form the body, can be 1/0
var body = [
  [4, 1], [5, 1],
  [4, 2],
  [3, 3], [4, 3],
  [3, 4], [4, 4],
  [2, 5], [3, 5], [4, 5],
  [1, 6], [2, 6], [3, 6],
  [1, 7], [2, 7], [3, 7],
  [1, 8], [2, 8], [3, 8],
  [1, 9], [2, 9], [3, 9], [4, 9],
  [3, 10], [4, 10], [5, 10]
]

var randomBlock = function () { return Math.round(Math.random()) === 1 }

var randomColor = function () {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

var draw = function (x, y, size, color) {
  return this.rect(x * size, y * size, size, size).attr({
    fill: color,
    color: color
  })
}


function Spaceship(size) {
  this.size = size || 5
  this.ship = [
    {
      color: randomColor(),
      pixels: solid.slice(0)
    },
    {
      color: randomColor(),
      pixels: cockpit.filter(randomBlock)
    },
    {
      color: randomColor(),
      pixels: body.filter(randomBlock)
    }
  ]
}

Spaceship.prototype.draw = function (raphael) {
  var size = this.size

  this.ship.forEach(function (properties) {
    var color = properties.color

    properties.pixels.forEach(function (px) {
      var x = px[0]
      var y = px[1]

      draw.call(raphael, x, y, size, color)
      draw.call(raphael, (6 * 2) - 1 - x, y, size, color)
    })
  })
}

// Example:
// new Spaceship(50).draw(Raphael(0, 0, 600, 600))

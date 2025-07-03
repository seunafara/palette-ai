function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
  }

  return array
}

function randomInt(min = 0, max = 255) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function convertRGB(color, toNum = false) {
  let item = color

  if (typeof color !== "string") {
    item = color.toString()
  }

  return item.split(",").map((number) => {
    const formattedNum = Number(number)
    if (toNum) {
      return formattedNum / 255
    }
    return formattedNum * 255
  })
}

/**
 * Source - https://stackoverflow.com/questions/49974145/how-to-convert-rgba-to-hex-color-code-using-javascript
 */

function rgb_any_to_hex(rgba, forceRemoveAlpha = false) {
  return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
    .split(',') // splits them at ","
    .filter((string, index) => !forceRemoveAlpha || index !== 3)
    .map(string => parseFloat(string)) // Converts them to numbers
    .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
    .map(number => number.toString(16)) // Converts numbers to hex
    .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
    .join("") // Puts the array to togehter to a string
}


export {
  convertRGB,
  randomInt,
  shuffle,
  rgb_any_to_hex
}

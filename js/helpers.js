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

export {
  convertRGB,
  randomInt,
  shuffle,
}

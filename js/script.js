import AI from "./AI.js"
import { convertRGB, shuffle, randomInt } from "./helpers.js"
import { tertiaryColors, textColors, trainingData } from "./constants.js"

const ai = new AI(trainingData).train()

// console.log(ai);

const primaryColorEl = document.getElementById("primary-color")
const secondaryColorEl = document.getElementById("secondary-color")
const tertiaryColorEl = document.getElementById("tertiary-color")
const textColorEl = document.getElementById("text-color")
const generateButton = document.getElementById("generate-btn")
const saveButton = document.getElementById("save-btn")

let match
const tracked = []
const saved = []

const generate = () => {
  const redShade = convertRGB(`255, ${randomInt()}, ${randomInt()}`, true)
  const blueShade = convertRGB(`${randomInt()}, ${randomInt()}, 255`, true)

  const tertiaryColor = convertRGB(shuffle(tertiaryColors)[0], true)
  const textColor = convertRGB(shuffle(textColors)[0], true)

  const [primaryColor, secondaryColor] = shuffle([redShade, blueShade])

  match = [primaryColor, secondaryColor, tertiaryColor, textColor].flat()

  if (match.length !== 12) {
    return generate()
  }
  const guess = ai.net.run(match)[0]

  console.log("guess ", guess)

  if (guess > 0.7) {
    primaryColorEl.style.backgroundColor = `rgba(${convertRGB(
      primaryColor,
      false,
    ).toString()})`

    secondaryColorEl.style.backgroundColor = `rgba(${convertRGB(
      secondaryColor,
      false,
    ).toString()})`

    tertiaryColorEl.style.backgroundColor = `rgba(${convertRGB(
      tertiaryColor,
      false,
    ).toString()})`

    textColorEl.style.backgroundColor = `rgba(${convertRGB(
      textColor,
      false,
    ).toString()})`

    tracked.push({
      input: match,
      output: [1],
    })

    return
  }

  generate()
}

generateButton.addEventListener("click", generate)

saveButton.addEventListener("click", () => {
  // Remove and modify last item in stack
  const current = tracked.pop()

  // push match to trainingData
  saved.push({
    input: current.input,
    output: [1],
  })

  ai.train([...ai.trainingData, ...saved])

  console.log("tracked Data ", tracked)
  console.log("saved Data ", saved)
})

generate()

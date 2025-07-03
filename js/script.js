import AI from "./AI.js"
import { convertRGB, shuffle, randomInt, rgb_any_to_hex } from "./helpers.js"
import { tertiaryColors, textColors, trainingData } from "./constants.js"

let ai = new AI(trainingData).train()

const HTML_ELEMENTS = {
  primaryColor: document.getElementById("primary-color"),
  primaryColorText: document.getElementById("primary-color-text"),
  secondaryColorText: document.getElementById("secondary-color-text"),
  secondaryColor: document.getElementById("secondary-color"),
  tertiaryColor: document.getElementById("tertiary-color"),
  tertiaryColorText: document.getElementById("tertiary-color-text"),
  textColor: document.getElementById("text-color"),
  textColorText: document.getElementById("text-color-text"),
  generateButton: document.getElementById("generate-btn"),
  saveButton: document.getElementById("save-btn")
}

let match
const tracked = []
const saved = []

var worker = new Worker('worker.js');

worker.addEventListener('message', function (e) {
  if (e.data instanceof Object) {
    switch (e.data.cmd) {
      case "net-refreshed":
        ai = new brain.NeuralNetwork().fromJSON(e.data.net)
        break;

      default:
        self.postMessage('Unknown command');
    }
    
  }
})

const generate = () => {
  const redShade = convertRGB(`255, ${randomInt()}, ${randomInt()}`, true)
  const blueShade = convertRGB(`${randomInt()}, ${randomInt()}, 255`, true)

  const tertiaryColor = convertRGB(shuffle(tertiaryColors)[0], true)
  const textColor = convertRGB(shuffle(textColors)[0], true)

  const [primaryColor, secondaryColor] = shuffle([redShade, blueShade])

  match = [primaryColor, secondaryColor, tertiaryColor, textColor].flat()

  if (match.length !== 12) {
    const diff = Math.abs(12 - match.length)
    match = [...new Array(diff).fill(0), ...match]
  }
  
  const guess = ai.run(match)[0]

  console.log("guess ", guess)

  if (guess > 0.7) {
    const primaryColorRgb = convertRGB(
      primaryColor,
      false,
    ).toString()
    HTML_ELEMENTS.primaryColor.style.backgroundColor = `rgba(${primaryColorRgb})`
    HTML_ELEMENTS.primaryColorText.innerHTML = rgb_any_to_hex(primaryColorRgb)

    const secondaryColorRgb = convertRGB(
      secondaryColor,
      false,
    ).toString()
    HTML_ELEMENTS.secondaryColor.style.backgroundColor = `rgba(${secondaryColorRgb})`
    HTML_ELEMENTS.secondaryColorText.innerHTML = rgb_any_to_hex(secondaryColorRgb)

    const tertiaryColorRgb = convertRGB(
      tertiaryColor,
      false,
    ).toString()
    HTML_ELEMENTS.tertiaryColor.style.backgroundColor = `rgba(${tertiaryColorRgb})`
    HTML_ELEMENTS.tertiaryColorText.innerHTML = rgb_any_to_hex(tertiaryColorRgb)

    const textColorRgb = convertRGB(
      textColor,
      false,
    ).toString()
    HTML_ELEMENTS.textColor.style.backgroundColor = `rgba(${textColorRgb})`
    HTML_ELEMENTS.textColorText.innerHTML = rgb_any_to_hex(textColorRgb)

    tracked.push({
      input: match,
      output: [0],
    })

    return
  }

  generate()
}

HTML_ELEMENTS.generateButton.addEventListener("click", generate)

HTML_ELEMENTS.saveButton.addEventListener("click", () => {
  // Remove and modify last item in stack
  const current = tracked.pop()

  // push match to trainingData
  saved.push({
    input: current.input,
    output: [1],
  })

  worker.postMessage({
    cmd: "ai",
    config: {
      binaryThresh: 0.5,
      hiddenLayers: [3],
      activation: 'sigmoid'
    },
    trainingData: [...tracked, ...saved],
  })

  console.log("tracked Data ", tracked)
  console.log("saved Data ", saved)
})

generate()

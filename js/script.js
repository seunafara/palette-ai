import AI from "./AI.js"
import { convertRGB, shuffle, randomInt } from "./helpers.js"
import { tertiaryColors, textColors, trainingData } from "./constants.js"

let ai = new AI(trainingData).train()

const HTML_ELEMENTS = {
  primaryColor: document.getElementById("primary-color"),
  secondaryColor: document.getElementById("secondary-color"),
  tertiaryColor: document.getElementById("tertiary-color"),
  textColor: document.getElementById("text-color"),
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
    HTML_ELEMENTS.primaryColor.style.backgroundColor = `rgba(${convertRGB(
      primaryColor,
      false,
    ).toString()})`

    HTML_ELEMENTS.secondaryColor.style.backgroundColor = `rgba(${convertRGB(
      secondaryColor,
      false,
    ).toString()})`

    HTML_ELEMENTS.tertiaryColor.style.backgroundColor = `rgba(${convertRGB(
      tertiaryColor,
      false,
    ).toString()})`

    HTML_ELEMENTS.textColor.style.backgroundColor = `rgba(${convertRGB(
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
    trainingData: saved,
  })

  console.log("tracked Data ", tracked)
  console.log("saved Data ", saved)
})

generate()

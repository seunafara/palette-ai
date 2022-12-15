import AI from './AI.js';
import { convertRGB, shuffle, randomInt } from "./helpers.js"
import { tertiaryColors, textColors, trainingData } from "./constants.js"

const ai = new AI(trainingData).train()

// console.log(ai);

const primaryColorEl = document.getElementById("primary-color");
const secondaryColorEl = document.getElementById("secondary-color");
const tertiaryColorEl = document.getElementById("tertiary-color");
const textColorEl = document.getElementById("text-color");
const generateButton = document.getElementById("generate-btn");
const saveButton = document.getElementById("save-btn");

let match;

const generate = () => {
  const redShade = convertRGB(
    `255, ${randomInt()}, ${randomInt()}`,
    true
  );
  const blueShade = convertRGB(
    `${randomInt()}, ${randomInt()}, 255`,
    true
  );

  const tertiaryColor = convertRGB(shuffle(tertiaryColors)[0], true);
  const textColor = convertRGB(shuffle(textColors)[0], true);

  const [primaryColor, secondaryColor] = shuffle([redShade, blueShade]);

  match = [...primaryColor, ...secondaryColor, ...tertiaryColor, ...textColor];

  const guess = ai.net.run(match)[0];

  if (guess > 0.5) {
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

		ai.trainingData.push({
			input: match,
			output: [1],
		})

		return
	}

  generate();
};

generateButton.addEventListener("click", generate);

saveButton.addEventListener("click", () => {
  // remove match for modification
  ai.trainingData.pop();

  // push match to trainingData
  ai.trainingData.push({
    input: match,
    output: [1],
  });


  console.log("trainingData", ai.trainingData);
});

generate();

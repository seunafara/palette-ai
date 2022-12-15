import AI from './AI.js';
import trainingData from "./trainingData.js"

const ai = new AI(trainingData).train()

// console.log(ai);

const primaryColorEl = document.getElementById("primary-color");
const secondaryColorEl = document.getElementById("secondary-color");
const tertiaryColorEl = document.getElementById("tertiary-color");
const textColorEl = document.getElementById("text-color");
const generateButton = document.getElementById("generate-btn");
const saveButton = document.getElementById("save-btn");

function randomColor(min = 0, max = 255) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const convertRGB = (color, toNum = false) => {
  let item = color;

  if (typeof color !== "string") {
    item = color.toString();
  }

  return item.split(",").map((number) => {
    const formattedNum = Number(number);
    if (toNum) {
      return formattedNum / 255;
    }
    return formattedNum * 255;
  });
};

const tertiaryColors = [
  "240, 255, 0",
  "139,105,20",
  "149, 165, 166",
  "245, 245, 220",
  "0 0 0",
  "0,255,0",
  "128,0,128",
  "254,251,234",
  "255,192,203",
  "255,69,0",
  "5,195,221",
  "255 255 255"
];

const textColors = ["0, 0, 0", "255, 255, 255"];

let match;

const generate = () => {
  const redShade = convertRGB(
    `255, ${randomColor(0, 255)}, ${randomColor(0, 255)}`,
    true
  );
  const blueShade = convertRGB(
    `${randomColor(0, 255)}, ${randomColor(0, 255)}, 255`,
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

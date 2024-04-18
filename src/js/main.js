import { randomWord, shuffleArray } from "./wordgenerate.js";

const guess = document.querySelector(".guess");
const btnRandom = document.querySelector(".btn-random");
const inputs = document.querySelectorAll("input[type=text]");

const random = (array) => {
  guess.innerHTML = "";
  array.forEach((element) => {
    const letter = document.createElement("span");
    guess.appendChild(letter).textContent = element;
  });
};

const displayRandomWord = async () => {
  try {
    const { word } = await randomWord();
    const array = word.split("");

    shuffleArray(array);
    random(array);
  } catch (error) {
    console.error("Error al obtener o procesar la palabra:", error);
  }
};

inputs.forEach((element, index) => {
  element.addEventListener("input", () => {
    if (element.value.length === 1) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        element.blur();
      }
    }
  });
  element.addEventListener("focus", () => {
    element.setAttribute("placeholder", "_");
  });
  element.addEventListener("blur", () => {
    element.removeAttribute("placeholder");
  });
});

document.addEventListener("DOMContentLoaded", displayRandomWord);
btnRandom.addEventListener("click", displayRandomWord);

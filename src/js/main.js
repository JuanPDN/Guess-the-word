import { randomWord, shuffleArray } from "./wordgenerate.js";

const guess = document.querySelector(".guess");
const btnRandom = document.querySelector(".btn-random");

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

document.addEventListener("DOMContentLoaded", displayRandomWord);
btnRandom.addEventListener("click", displayRandomWord);

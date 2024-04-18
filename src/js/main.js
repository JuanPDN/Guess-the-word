import { randomWord, shuffleArray } from "./wordgenerate.js";

const guess = document.querySelector(".guess");
const btnRandom = document.querySelector(".btn-random");
const inputs = document.querySelectorAll("input[type=text]");
const tries = document.querySelector(".tries");
const listTries = document.querySelectorAll("li");
const mistakes = document.querySelector(".mistakes");
const btnReset = document.querySelector(".btn-reset");

let result = [];
let errors = 0;
let mistake = ""
const answer = [];

const validation = () => {
  if (answer.length === 6) {
    for (let i = 0; i < 6; i++) {
      if (answer[i] !== result[i]) {
        errors++;
        updateTries();
        return;
      }
    }
  }
};

const updateTries = () => {
  tries.textContent = `Tries (${errors}/5)`;
  listTries[errors-1].classList.add("bg-7429C6");
};

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
    result = word.split("");
    const array = word.split("");

    shuffleArray(array);
    random(array);
  } catch (error) {
    console.error("Error al obtener o procesar la palabra:", error);
  }
};

inputs.forEach((element, index) => {
  element.addEventListener("input", () => {
    answer[index] = element.value;
    if (element.value.length === 1) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        element.blur();
        validation();
      }
    }
  });

  element.addEventListener("focus", () => {
    element.setAttribute("placeholder", "_");
    element.select();
  });

  element.addEventListener("blur", () => {
    element.removeAttribute("placeholder");
  });
});

document.addEventListener("DOMContentLoaded", displayRandomWord);
btnRandom.addEventListener("click", displayRandomWord);

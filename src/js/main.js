import { randomWord, shuffleArray } from "./wordgenerate.js";

const guess = document.querySelector(".guess");
const btnRandom = document.querySelector(".btn-random");
const inputs = document.querySelectorAll("input[type=text]");
const tries = document.querySelector(".tries");
const listTries = document.querySelectorAll("li");
const mistakes = document.querySelector(".mistakes");
const btnReset = document.querySelector(".btn-reset");
const body = document.querySelector("body");

let result = [];
let counter = 0;
let errors = 0;
let mistake = "";
const answer = [];

const validation = () => {
  if (answer.length === 6) {
    for (let i = 0; i < 6; i++) {
      if (answer[i] !== result[i]) {
        if (mistake === "") {
          mistake = `${answer[i]}`;
        } else {
          mistake = `${mistake}, ${answer[i]}`;
        }
        errors++;
        updateMistakes();
        resetInputs();
        updateTries();
        return;
      }
    }
    counter++;
    resetInputs();
    displayRandomWord();
  }
};

const status = {
  win: "🎉  Winner!!",
  losse: "😓 You losse",
};

const winOrLosse = () => {
  if (errors === 6 || counter === 10) {
    const resultMessage = errors === 6 ? status.losse : status.win;
    const message = `
        <div class="message absolute bg-F2F5F9 shadow-[0_0_0_100vh_rgb(0,0,0,0.3)]
        p-14 text-6xl rounded-xl m-4">${resultMessage}</div>`;
    body.insertAdjacentHTML("beforeend", message);
    setTimeout(() => {
      document.querySelector(".message").remove();
      resetAll();
    }, 2000);
  }
};

const resetInputs = () => {
  inputs.forEach((e) => {
    e.value = "";
  });
  inputs[0].focus();
};

const updateTries = () => {
  tries.textContent = `Tries (${errors}/6)`;
  if (errors === 0) {
    listTries.forEach((e) => {
      e.classList.remove("bg-7429C6");
    });
  } else {
    listTries[errors - 1].classList.add("bg-7429C6");
  }
};

const updateMistakes = () => {
  mistakes.textContent = mistake;
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

const resetAll = () => {
  counter = 0;
  errors = 0;
  mistake = "";
  updateMistakes();
  updateTries();
  resetInputs();
};

inputs.forEach((element, index) => {
  element.addEventListener("input", () => {
    answer[index] = element.value.toLowerCase();
    if (element.value.length === 1) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        element.blur();
        validation();
        winOrLosse();
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
btnReset.addEventListener("click", resetAll);

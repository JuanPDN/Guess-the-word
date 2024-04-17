import { randomWord, shuffleArray } from "./wordgenerate.js";

const { word } = await randomWord();
const array = word.split('')

console.log(array);

console.log(shuffleArray(array))

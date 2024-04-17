const randomWord = async () => {
  try {
    const response = await fetch("./src/js/data.json");
    const data = await response.json();
    const index = Math.floor(Math.random() * (data.length - 1));
    return data[index];
  } catch (error) {
    console.error("error load data", error);
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { randomWord, shuffleArray };

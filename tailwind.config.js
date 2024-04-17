/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/js/*.js"],
  theme: {
    extend: {
      fontFamily: {
        Outfit: ['"Outfit"', "sans-serif"],
      },
      backgroundImage: {
        guess: 'url("../assets/bg-guess-the-word.png")',
      },
      colors: {
        "7429C6": "#7429C6",
        C951E7: "#C951E7",
        672171: "#672171",
        "4A5567": "#4A5567",
        "97A3B6": "#97A3B6",
        "030616": "#030616",
        F2F5F9: "#F2F5F9",
        "20293A": "#20293A",
      },
    },
  },
  plugins: [],
};

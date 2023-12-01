/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary1: "#A843D6",
        primary2: "#DEA9F6",
        secondary1: "#00A400",
        secondary2: "#66B966",
        grayscale7: "#202027",
        grayscale6: "#4D4D4D",
        grayscale5: "#808080",
        grayscale4: "#C6C6C6",
        grayscale3: "#E9E9E9",
        grayscale2: "#F3F3F3",
        grayscale1: "#FFFFFF",
      },
      fontFamily: {
        thin: ["thin"],
        light: ["light"],
        regular: ["regular"],
        medium: ["medium"],
        bold: ["bold"],
        extrabold: ["extrabold"],
      },
    },
  },
  plugins: [],
};

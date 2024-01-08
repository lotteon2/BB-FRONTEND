/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary7: "#315136",
        primary6: "#3C7F44",
        primary5: "#41744D",
        primary4: "#85C031",
        primary3: "#C2DE8A",
        primary2: "#C2DABC",
        primary1: "#EEE29B",
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
        english: ["english"],
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
      },
    },
  },
  plugins: [],
};

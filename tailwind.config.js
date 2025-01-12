/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      base: ["16px", "16px"],
    },
    fontFamily: {
      yClover: ['"Y Clover"'],
      galmuri9: ['"Galmuri9"'],
      dogica: ['"Dogica Pixel"'],
    },
    backgroundColor: {
      test: "white",
      test2: "blue",
      test3: "green",
    },
    backgroundImage: {
      "movie-side": "url('@Assets/images/movie-side.png')",
    },
    extend: {},
  },
  plugins: [],
};

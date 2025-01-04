/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        secondary: "#8661c1",
        primary: "#2e294e",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

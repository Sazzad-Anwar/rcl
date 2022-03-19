module.exports = {
  darkMode: 'class',
  // important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./projectComponents/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      nunito: ['Nunito Sans', 'sans-serif'],
    }
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
}
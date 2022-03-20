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
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '0rem',
      },
    },
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
}
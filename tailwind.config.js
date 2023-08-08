/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        header: ['headerFont', 'sans-serif'],
        label: ['labelFont', 'sans-serif'],
        msg: ['msgFont', 'sans-serif'],
        textHeader: ['textHeaderFont', 'sans-serif'],
        letter: ['letterFont', 'sans-serif'],
      },
    },
  },
  plugins: [
  ],
}


const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./index.html",
  ],
  theme: {
    fontFamily: {
      sans: ['redhat', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      'rose': {
        50:  'hsl(20, 50%, 98%)',
        100: 'hsl(13, 31%, 94%)',
        300: 'hsl(14, 25%, 72%)',
        400: 'hsl(7, 20%, 60%)',
        500: 'hsl(12, 20%, 44%)',
        900: 'hsl(14, 65%, 9%)',
      },
      'red': 'hsl(14, 86%, 42%)'
    },
    extend: {},
  },
  plugins: [],
}


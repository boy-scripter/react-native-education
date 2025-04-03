/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all files inside src
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        theme: {
          default: '#1D61E7',
          900:'#0D0D1B'
        },
      },
      fontFamily: {
        inter: ['Inter-Regular'],
        interBold: ['Inter-Bold'],
      },
      backgroundImage: {
        'theme-gradient': "'linear-gradient(to bottom, white 12%, #1D61E7)',",
      },
    },
  },
  plugins: [],
};

import colorConstant from './src/constant/color.constant';

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
        greyish: {
          DEFAULT: colorConstant.greyish.DEFAULT,
          100: colorConstant.greyish['100'],
          200: colorConstant.greyish['200'],
        },
        theme: {
          DEFAULT: colorConstant.theme.DEFAULT,
          100: colorConstant.theme['100'],
          900: colorConstant.theme['900'],
        },
      },
      fontFamily: {
        inter: ['Inter-Regular'],
        interBold: ['Inter-Bold'],
      },
    },
  },
  plugins: [],
};

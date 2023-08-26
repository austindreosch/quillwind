/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-dm-sans)'],
        heading: ['var(--font-rubik)']
      },
      colors: {
        'my-white': '#ffffffff',
        'my-black': '#00171fff',
        'my-darkblue': '#003459ff',
        'my-midblue': '#007ea7ff',
        'my-lightblue': '#00a8e8ff',
        'my-yellow': '#FFE066',
        'my-green': '#70C1B3'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    extend: {
      scrollbar: ['rounded'],
    },
  },
};

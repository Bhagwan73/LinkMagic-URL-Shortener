/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        // mobile screen 
        'xs': {'min':'280px' , 'max':'820px'} ,  
      }
    },
  },
  plugins: [],
}
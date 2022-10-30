/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradienthero:
          "linear-gradient(40deg, rgba(154,32,60,1) 0%, rgba(17,24,39,1) 0%, rgba(17,24,39,1) 30%, rgba(154,32,60,1) 100%);",
        gradientcorner:
          "linear-gradient(20deg, rgba(17,24,39,1) 32%, rgba(17,24,39,1) 68%, rgba(154,32,60,1) 100%);",
        gradientedge:
          "linear-gradient(40deg, rgba(154,32,60,1) 0%, rgba(17,24,39,1) 0%, rgba(17,24,39,1) 90%, rgba(154,32,60,1) 100%);",
        gradientpage:
          "linear-gradient(14deg, rgba(154,32,60,1) 0%, rgba(17,24,39,1) 20%, rgba(17,24,39,1) 80%, rgba(154,32,60,1) 100%);",
        gradientmix:
          "linear-gradient(90deg, #f0357c, #f154ff, #777dff, #497ce2, #37bdde);",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: "#eee8dd",
        title: "#333333"
      },
      fontFamily: {
        gluten: ["Gluten", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        afacad: ["Afacad", "sans-serif"],


      },
    },
  },
  plugins: [],
};

export default tailwindConfig;

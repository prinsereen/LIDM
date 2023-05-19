/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#d6e6ff",
        secondary: "#E5EFFF",
        tertiary: "#82B3FF",
      },
    },
    fontFamily: {
      sans: ["Urbanist", "sans-serif"],
    },
  },
  plugins: [],
};

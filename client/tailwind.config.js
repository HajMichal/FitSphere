/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      background: "#F9F9F9",
      white: "#fff",
      grey: "#AAADB0",
      brand: "#02CF8A",
      dark: "#212121",
      error: "#FF3333",
    },
    fontFamily: {
      montserrat: ["Montserrat"],
      raleway: ["Raleway"],
    },
    extend: {
      height: {
        "screen-minus-nav": "`calc(100dvh - 67px)`",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

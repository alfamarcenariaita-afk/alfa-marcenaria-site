/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // paleta "madeira nobre": marrom escuro pra texto/rodape/CTA, dourado pra destaque.
        wood: {
          50: "#F8F3EC",
          100: "#EEE2D2",
          200: "#D9C3A4",
          700: "#5B3E28",
          800: "#3D2A1B",
          900: "#251A11",
        },
        gold: {
          500: "#C6995E",
          600: "#B0824A",
          700: "#8F6836",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

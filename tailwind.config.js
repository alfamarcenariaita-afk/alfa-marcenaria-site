/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // paleta "madeira nobre": marrom escuro pra texto/rodape/CTA, dourado pra destaque.
        // Os valores vem de variaveis CSS geradas em lib/tema.js a partir das cores escolhidas
        // no painel /admin (Configuracoes do site); `<alpha-value>` mantem bg-wood-900/70 etc.
        wood: {
          50: "rgb(var(--wood-50) / <alpha-value>)",
          100: "rgb(var(--wood-100) / <alpha-value>)",
          200: "rgb(var(--wood-200) / <alpha-value>)",
          700: "rgb(var(--wood-700) / <alpha-value>)",
          800: "rgb(var(--wood-800) / <alpha-value>)",
          900: "rgb(var(--wood-900) / <alpha-value>)",
        },
        gold: {
          500: "rgb(var(--gold-500) / <alpha-value>)",
          600: "rgb(var(--gold-600) / <alpha-value>)",
          700: "rgb(var(--gold-700) / <alpha-value>)",
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

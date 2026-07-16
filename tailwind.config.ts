import type { Config } from "tailwindcss";

/**
 * PARILATA FOUNDATION — design tokens
 * Palette named after the elements it represents, not generic "primary/secondary".
 *  canopy   — deep forest green, the anchor color (headers, footer, ink-on-light)
 *  moss     — light green accent, growth & optimism (badges, links, hover states)
 *  earth    — warm brown, groundedness (dividers, secondary CTAs, borders)
 *  sky      — pale blue, air & water (backgrounds, illustrative accents)
 *  paper    — warm off-white base (never pure white, feels organic/printed)
 *  ink      — near-black green-tinted text color
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canopy: {
          DEFAULT: "#1F3D2E",
          50: "#EAF0EC",
          100: "#CFDED5",
          300: "#7FA98D",
          500: "#3E6B50",
          700: "#1F3D2E",
          900: "#0F2119",
        },
        moss: {
          DEFAULT: "#7FA65C",
          100: "#E3EED8",
          300: "#B4D19A",
          500: "#7FA65C",
          700: "#5A7D3E",
        },
        earth: {
          DEFAULT: "#6B4A32",
          100: "#EDE1D5",
          300: "#C9A582",
          500: "#8A6042",
          700: "#6B4A32",
        },
        sky: {
          DEFAULT: "#7FB8D9",
          100: "#E4F1F8",
          300: "#AFD8EA",
          500: "#7FB8D9",
          700: "#4C8CAE",
        },
        paper: "#F7F5EF",
        ink: "#16241B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        organic: "63% 37% 54% 46% / 43% 47% 53% 57%",
      },
      keyframes: {
        "ring-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.04)", opacity: "0.8" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        "ring-pulse": "ring-pulse 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        carbon: {
          950: "#0f0c0a",
          900: "#171310",
          800: "#211c18",
        },

        brasa: {
          300: "#ff9a3d",
          400: "#f97316",
          500: "#e8590c",
          600: "#c2410c",
        },

        crema: {
          50: "#faf6ec",
          100: "#f5efe0",
          200: "#e9deca",
        },

        humo: {
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
        },
      },

      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        accent: ["Barlow Condensed", "sans-serif"],
      },

      keyframes: {
        ember: {
          "0%": {
            transform: "translateY(0px)",
            opacity: "0",
          },
          "15%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-550px)",
            opacity: "0",
          },
        },

        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        ember: "ember linear infinite",
        "fade-up": "fade-up 0.8s ease forwards",
      },
    },
  },

  plugins: [],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
import {nextui} from "@nextui-org/react";
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#022C49",
        "soft-blue": "#B5CCFA",
        "lite-grayish-blue": "#ECECED",
        "cyan-card": "#00D0F1",
        "green-card": "#7BB13C",
        "soft-violet": "#D3A5E9",
        "pure-white": "#ffffff",
        "pure-red": "#FF0000",
        "red-card": "#E84646",
        "lime-green": "#0EBE7F",
        "soft-green": "#BDEA73",
        "light-gray": "#D2D2D2",
        "dark-gray": "#616161",
        "pure-black": "#000000",
        "yellow-card": "#FFBC34",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
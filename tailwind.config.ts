import type { Config } from "tailwindcss";

const config: Config = {
  daisyui: {
    themes: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      green: "#28A745",
      red: "#FF5861",
      "gray-100": "#F7F7F7",
      "gray-200": "#EBEBEB",
      "gray-300": "#D6D6D6",
      "gray-400": "#BDBDBD",
      "gray-500": "#999999",
      "gray-600": "#757575",
      "gray-700": "#616161",
      "gray-800": "#424242",
      "gray-900": "#212121",
      "button-primary-color": "#5227CC",
      "button-secondary-color": "#7749F8",
      "button-tertiary-color": "#EBE5FC",
      "button-primary-hover-color": "#A370F7",
    },
    screens: {
      sm: "270px",
      // => @media (min-width: 390px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("daisyui")],
};
export default config;

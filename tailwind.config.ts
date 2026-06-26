import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#070705",
        ink: "#10100d",
        paper: "#f4efe4",
        bone: "#d8d0bf",
        wire: "#d4a935",
        volt: "#b7ff4a",
        signal: "#ff6b35",
        brick: "#a83228"
      },
      boxShadow: {
        atelier: "0 24px 90px rgba(0, 0, 0, 0.45)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "Aptos",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        display: [
          "Didot",
          "Bodoni 72",
          "Georgia",
          "Times New Roman",
          "serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;

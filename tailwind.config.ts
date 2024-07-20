import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        retroBg: '#1A1A1A', // Example color, change to your preferred retro theme color
      },
      fontFamily: {
        univers: ['Univers 67', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

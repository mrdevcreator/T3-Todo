import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  //plugins: [require("tailwindcss"), require("autoprefixer")],
} satisfies Config;

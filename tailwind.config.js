import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: "#E78347",
        customeYellow: "#F6F052",
        customeDarkGreen: "#086A18",
        customeLightGreen: "#0AD0A5",
        customeDarkBlue: "#161486",
        customeLightBlue: "#74BEF4",
        customeRed: "#E34057",
        customePink: "#C69AD6",
        customeBrown: "#765515",
      },
    },
  },
  plugins: [require("daisyui")],
};

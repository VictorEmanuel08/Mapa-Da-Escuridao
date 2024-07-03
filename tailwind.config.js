/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#EFEFEF",
        blue_primary: "#1F3241",
        blue_secondary: "#03121F",
        orange: "#FFA300",
      },
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "html, body": {
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          // overflow: "hidden", // Uncomment this line if you want to prevent scrolling
        },
      });
    },
    require("@tailwindcss/forms"), // Adding the @tailwindcss/forms plugin
  ],
};

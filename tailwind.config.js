/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#FFFFFF",
        dark: "#393E46",
        bgLightSecondary: "#EEF2FF",
        bgDarkSecondary: "#222222",
        lightPrimary: "#000000",
        lightSecondary: "#686D76",
        DarkPrimary: "#FFFFFF",
        DarkSecondary: "#EBEBEB",
        accent: "rgba(162,102,246)",
        red: "#FF5858",
        green: "#86C8BC",
        blue: "#86C8BC",

      },
      backgroundImage: {
        lightGradient:
          "linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);",
        darkGradient:
          "linear-gradient( 110.3deg,  rgba(73,93,109,1) 4.3%, rgba(49,55,82,1) 96.7% )",
        gradient2: "linear-gradient(90deg, #d4fc89 0%, #96e6a2 50%);",
        gradient1:
          "radial-gradient( circle farthest-corner at 10% 20%,  rgba(162,102,246,1) 0%, rgba(203,159,249,1) 90% );",
      },
      boxShadow: {
        shadow1:
          "20px 0px 50px 0px rgba(162,102,246,.5) ,-20px 0px 50px 0px rgba(163,255,175,.7)",
        exchangeCardShadow: "0px 28px 39px -17px rgba(162,102,246,0.7)",
        portfolioCardShadow: "0px 28px 39px -17px rgba(163,255,175,0.7)",
      },
    },
  },
  plugins: [],
};

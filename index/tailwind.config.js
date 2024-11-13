/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans'", "sans-serif"]
      },
      colors: {
        blue: "#3965a8",
        "blue-light": "#5598d3",
        "blue-dark": "#384a9b",
        "blue-opacity": "#3965a8bf",
        gold: "#ffae1a",
        bg1: "#16161a",
        "bg-light": "#222031",
        "bg-dark": "#1c1e23",
        "grey-light": "#c8cbce",
        "night-sky": "#1d1b28",
        "meteor-glow": "#d1daff",
        "meteor-body": "#ecf0ff",
        "text-color": "#f2f5f7"
      },
      keyframes: {
        flicker: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" }
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        // dealing with multiple transformations 👎
        wiggle: {
          "0%": { rotate: "0deg" },
          "20%": { rotate: "20deg" },
          "40%": { rotate: "-20deg" },
          "60%": { rotate: "20deg" },
          "80%": { rotate: "-20deg" },
          "100%": { rotate: "0deg" }
        },
        pop: {
          "0%": { scale: "1" },
          "80%": { scale: "1.1" },
          "100%": { scale: "1" }
        },
        meteor: {
          "0%": { top: "0", left: "0" },
          "100%": { top: "800px", left: "-800px" }
        }
      },
      animation: {
        flicker: "flicker 1s infinite",
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
        pop: "pop 0.3s ease-in-out",
        "wiggle-pop": "wiggle 0.75s ease-in-out, pop 0.75s ease-in-out",
        meteor: "meteor linear 0.5s"
      }
    }
  },
  plugins: []
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        fadeIn: "fadeIn 0.2s ease-out",
      },
      colors: {
        twitter: {
          dark: "#0f1419",
          muted: "#8899a6",
        },
        // Custom border color
        borderDark: "#0f1419",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

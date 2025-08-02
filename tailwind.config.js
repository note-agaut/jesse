module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 6s linear infinite",
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

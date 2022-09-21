module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      green: "#32ce0f",
      brand: "#E0BEA2",
      white: "#FFFFFF",
      dark: "#252525",
      red: "#f00",
      blue: "#0000ff",
      gray: "#ccc",
      "bg-color": "#F9F9F9",
      "border-color": "#25252580",
    },
    screens: {
      xs: "100%",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
  },
  plugins: [],
};

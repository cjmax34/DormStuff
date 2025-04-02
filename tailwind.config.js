/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        gblack: ["Geist-Black", "sans-serif"],
        gbold: ["Geist-Bold", "sans-serif"],
        gextrabold: ["Geist-ExtraBold", "sans-serif"],
        gextralight: ["Geist-ExtraLight", "sans-serif"],
        glight: ["Geist-Light", "sans-serif"],
        gmedium: ["Geist-Medium", "sans-serif"],
        gregular: ["Geist-Regular", "sans-serif"],
        gsemibold: ["Geist-SemiBold", "sans-serif"],
        gthin: ["Geist-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};

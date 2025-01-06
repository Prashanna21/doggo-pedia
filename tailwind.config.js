const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'], // Primary font family
        nunito: ['"Nunito"', ...defaultTheme.fontFamily.sans]
      },
      fontWeight: {
        light: '300',  // Ubuntu Light
        regular: '400', // Ubuntu Regular
        medium: '500',  // Ubuntu Medium
        bold: '700',    // Ubuntu Bold
      },
	  fontSize :{
		customSize: "18px",
	  },
	  hyphens: {
        auto: 'auto',
        manual: 'manual',
        none: 'none',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

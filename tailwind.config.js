/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cellbg: '#ffffff',
        emerald: '#4CAF50',
        mint: '#C8E6C9',
        seafoam: '#B2DFDB',
        sage: '#A5D6A7',
        bg: '#F5FFFA',
        'cell-selected': '#B2DFDB', /* Define custom color for selected cells */
      }
    },
  },
  plugins: [],
}

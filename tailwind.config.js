/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // This is your original animation
        'scroll-x': 'scroll-x 40s linear infinite',
        
        // ADD THIS NEW LINE FOR A FASTER ANIMATION
        'scroll-x-fast': 'scroll-x 25s linear infinite', 
      },
      keyframes: {
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-pink': '#ff007f',
        'electric-blue': '#00d4ff',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'glitch': 'glitch 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        glitch: {
          '0%, 100%': {
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)',
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
            filter: 'hue-rotate(90deg)',
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
            filter: 'hue-rotate(180deg)',
          },
          '60%': {
            transform: 'translate(2px, 2px)',
            filter: 'hue-rotate(270deg)',
          },
          '80%': {
            transform: 'translate(2px, -2px)',
            filter: 'hue-rotate(360deg)',
          },
        },
      },
      boxShadow: {
        'neon-green': '0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 60px #39ff14',
        'neon-pink': '0 0 20px #ff007f, 0 0 40px #ff007f, 0 0 60px #ff007f',
        'neon-blue': '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff',
      },
    },
  },
  plugins: [],
}
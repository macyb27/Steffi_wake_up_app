/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-pink': '#ff007f',
        'electric-blue': '#0080ff',
      },
      boxShadow: {
        'neon-green': '0 0 20px #39ff14, 0 0 40px #39ff14, 0 0 80px #39ff14',
        'neon-pink': '0 0 20px #ff007f, 0 0 40px #ff007f, 0 0 80px #ff007f',
        'neon-blue': '0 0 20px #0080ff, 0 0 40px #0080ff, 0 0 80px #0080ff',
        'neon': '0 0 20px currentColor, 0 0 40px currentColor',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'center bottom'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '25%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
          '75%': {
            'background-size': '400% 400%',
            'background-position': 'center bottom'
          }
        },
        'glow-pulse': {
          '0%, 100%': { 
            'box-shadow': '0 0 20px currentColor, 0 0 40px currentColor'
          },
          '50%': { 
            'box-shadow': '0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor'
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 6s ease infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(-45deg, #ff007f, #39ff14, #0080ff, #ff007f)',
        'neon-gradient-dark': 'linear-gradient(-45deg, #1a0010, #001a05, #000a1a, #1a0010)',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#040609',
          900: '#07090e',
          850: '#0b0e15',
          800: '#10141e',
        },
        midnight: {
          900: '#111625',
          800: '#161c2e',
          700: '#1e263d',
          600: '#2b3654',
        },
        ice: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          glow: 'rgba(56, 189, 248, 0.25)',
        },
        copper: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          glow: 'rgba(249, 115, 22, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['"Instrument Serif"', '"DM Serif Display"', 'Georgia', 'serif'],
        dmMono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 12s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulseGlow': {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(249, 115, 22, 0.6))' },
        }
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}

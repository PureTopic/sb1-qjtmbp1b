/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', 'Montserrat', 'ui-sans-serif', 'system-ui'],
        'serif': ['Cinzel Decorative', 'ui-serif', 'Georgia'],
        'body': ['Lato', 'ui-sans-serif', 'system-ui'],
        'display': ['Cinzel Decorative', 'ui-serif', 'Georgia'],
      },
      colors: {
        brass: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        copper: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        steam: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      backgroundImage: {
        'steampunk-gradient': 'linear-gradient(135deg, #92400e 0%, #451a03 25%, #064e3b 75%, #1f2937 100%)',
        'brass-gradient': 'linear-gradient(135deg, #fcd34d 0%, #d97706 50%, #92400e 100%)',
        'copper-gradient': 'linear-gradient(135deg, #f59e0b 0%, #dc2626 50%, #7c2d12 100%)',
      },
      boxShadow: {
        'steampunk': '0 4px 14px 0 rgba(146, 64, 14, 0.39), inset 0 1px 0 rgba(252, 211, 77, 0.3)',
        'brass': '0 2px 8px 0 rgba(146, 64, 14, 0.5), inset 0 1px 0 rgba(252, 211, 77, 0.4)',
        'copper': '0 2px 8px 0 rgba(124, 45, 18, 0.5), inset 0 1px 0 rgba(245, 158, 11, 0.4)',
        'glow': '0 0 20px rgba(252, 211, 77, 0.3)',
        'inner-glow': 'inset 0 0 10px rgba(252, 211, 77, 0.2)',
      },
      animation: {
        'steam': 'steam 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bubble': 'bubble 4s ease-in-out infinite',
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(252, 211, 77, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(252, 211, 77, 0.6)' },
        },
        bubble: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
};
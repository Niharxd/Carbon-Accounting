export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animationDelay: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
      },
      keyframes: {
        orb: {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)', opacity: '0.15' },
          '33%': { transform: 'scale(1.08) translate(20px, -15px)', opacity: '0.22' },
          '66%': { transform: 'scale(0.95) translate(-15px, 10px)', opacity: '0.12' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        orb: 'orb 12s ease-in-out infinite',
        'orb-slow': 'orb 18s ease-in-out infinite reverse',
        countUp: 'countUp 0.4s ease both',
      },
    },
  },
  plugins: [],
};

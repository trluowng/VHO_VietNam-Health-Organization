/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    // Rest of the app uses its own hand-rolled CSS design system (index.css).
    // Preflight resets element defaults globally and would fight with it,
    // so it's disabled — Tailwind here is purely utility classes for the
    // landing page components.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#102A5C',
          deep: '#071B45',
        },
        cyan: {
          DEFAULT: '#1C9FE3',
        },
        teal: {
          DEFAULT: '#11A7A7',
          deep: '#07899A',
        },
        skytint: {
          bg: '#EFF8FF',
          border: '#DCEAF6',
        },
        slate: {
          text: '#62708E',
        },
        statusgreen: {
          DEFAULT: '#32965D',
          bg: '#E7F7ED',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Be Vietnam Pro"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'leaf-sway': {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(7deg)' },
        },
      },
      animation: {
        'float-soft': 'float-soft 4.5s ease-in-out infinite',
        'float-soft-slow': 'float-soft 5.5s ease-in-out infinite',
        'leaf-sway': 'leaf-sway 4.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

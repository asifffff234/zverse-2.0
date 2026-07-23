/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A0605', 2: '#170B09', 3: '#23120D' },
        paper: '#F4F0EA',
        steel: '#A69A93',
        line: 'rgba(244,240,234,0.10)',
        signal: { DEFAULT: '#FF3A00', dim: '#3A0F02' },
        hazard: '#FF2D4F',
        oxblood: { DEFAULT: '#8A1410', 2: '#6B140F' },
        maroon: { DEFAULT: '#4A0E0B', 2: '#6B140F' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontWeight: {
        black: '800',
      },
      letterSpacing: {
        widest2: '0.2em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '65%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
        popIn: 'popIn 0.45s cubic-bezier(.34,1.56,.64,1)',
        fadeUp: 'fadeUp 0.7s cubic-bezier(.16,1,.3,1) both',
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10131c',
        inksoft: '#1b1f2c',
        porcelain: '#edeef2',
        paper: '#f8f8f6',
        gold: '#b8933e',
        periwinkle: '#8b93f0',
        rose: '#c9556b',
        emerald: '#1f6f5c',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['"Inter Tight"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

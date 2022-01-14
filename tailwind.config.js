// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    screens: {
      smm: { min: '335px', max: '768px' }, // 自定义
      // => @media (min-width: 335px and max-width: 768px) { ... }
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px'
      // => @media (min-width: 1280px) { ... }
    },

    extend: {
      height: {
        97: '25rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

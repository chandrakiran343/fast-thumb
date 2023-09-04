/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Abel: ['Abel', 'sans-serif'],
      },
      screens: {
        'mob':
          {
            'raw': '(max-height: 640px)'
          }
      },
      colors: {
        // primary: "#315C57",
        // secondary: "#7E9064",
        'rose':
        {
          DEFAULT: '#f72585', 100: '#37021a', 200: '#6e0434', 300: '#a5064e', 400: '#dc0868', 500: '#f72585', 600: '#f9529d', 700: '#fa7db5', 800: '#fca8ce', 900: '#fdd4e6'
        }
        ,
        'fandango': {
          DEFAULT: '#b5179e', 100: '#24051f', 200: '#48093f', 300: '#6c0e5e', 400: '#90137e', 500: '#b5179e', 600: '#e326c7', 700: '#ea5dd5', 800: '#f193e3', 900: '#f8c9f1'
        },
        'grape': {
          DEFAULT: '#7209b7', 100: '#170225', 200: '#2e034a', 300: '#45056f', 400: '#5c0794', 500: '#7209b7', 600: '#980df4', 700: '#b14af6', 800: '#cb86f9', 900: '#e5c3fc'
        },
        'chrysler_blue': {
          DEFAULT: '#560bad', 100: '#110223', 200: '#230445', 300: '#340768', 400: '#45098a', 500: '#560bad', 600: '#750fea', 700: '#9747f3', 800: '#ba84f7', 900: '#dcc2fb'
        },
        'dark_blue': {
          DEFAULT: '#480ca8', 100: '#0e0221', 200: '#1c0543', 300: '#2b0764', 400: '#390986', 500: '#480ca8', 600: '#6210e5', 700: '#8745f2', 800: '#af83f6', 900: '#d7c1fb'
        },
        'zaffre': {
          DEFAULT: '#3a0ca3', 100: '#0b0220', 200: '#170541', 300: '#220761', 400: '#2e0a81', 500: '#3a0ca3', 600: '#4f11e0', 700: '#7743f1', 800: '#a582f6', 900: '#d2c0fa'
        },
        'palatinate_blue': {
          DEFAULT: '#3f37c9', 100: '#0c0b28', 200: '#191650', 300: '#252178', 400: '#322ca0', 500: '#3f37c9', 600: '#655fd3', 700: '#8b87de', 800: '#b2afe9', 900: '#d8d7f4'
        },
        'neon_blue': {
          DEFAULT: '#4361ee', 100: '#050f38', 200: '#0a1d70', 300: '#102ca8', 400: '#153ae0', 500: '#4361ee', 600: '#6a83f1', 700: '#8fa2f5', 800: '#b4c1f8', 900: '#dae0fc'
        },
        'chefchaouen_blue': {
          DEFAULT: '#4895ef', 100: '#051d39', 200: '#0a3b72', 300: '#0f58ac', 400: '#1475e5', 500: '#4895ef', 600: '#6dabf2', 700: '#91c0f5', 800: '#b6d5f9', 900: '#daeafc'
        },
        'vivid_sky_blue': {
          DEFAULT: '#4cc9f0', 100: '#052e3a', 200: '#095c75', 300: '#0e8aaf', 400: '#13b8ea', 500: '#4cc9f0', 600: '#70d5f3', 700: '#93dff6', 800: '#b7eaf9', 900: '#dbf4fc'
        }
      },
      animation: {
        goUp: 'goUp 1s ease-in-out infinite alternate'
      },
      keyframes: {
        goUp: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-65px)' },
        }
      }
    }
  },
  plugins: [],
}
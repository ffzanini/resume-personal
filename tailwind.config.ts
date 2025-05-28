import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: 'calc(1216px + 16px)',
        '2xl': 'calc(1216px + 16px)',
      },
    },

    extend: {
      fontSize: {
        caption: '1rem',
        body: '1.2rem',
        h4: '1.4rem',
        h3: '1.7rem',
        h2: '2.3rem',
        h1: '3.0rem',
      },
      colors: {
        'dark-theme-background': '#121212',
        'white-theme-background': '#FFFFFF',

        'primary-color-50': '#fff0f2',
        'primary-color-100': '#ffe2e7',
        'primary-color-200': '#ffc9d5',
        'primary-color-300': '#ff9db3', // dark theme
        'primary-color-400': '#ff668b',
        'primary-color-500': '#ff3067',
        'primary-color-600': '#f32263', // main color
        'primary-color-700': '#cc0447', // variant color
        'primary-color-800': '#aa0743', // light theme
        'primary-color-900': '#920940',
        'primary-color-950': '#52001e',

        'error-dark-theme': '#CF6679',
        'error-white-theme': '#B00020',

        'primary-color-dark-theme-text': '#FFFFFF',
        'opacity-color-dark-theme-text': 'rgba(255,255,255, 0.87)',
        'disabled-text-color-dark-theme': 'rgba(255,255,255, 0.38)',

        'primary-color-white-theme-text': '#000000',
        'opacity-color-white-theme-text': 'rgba(0,0,0, 0.87)',
        'disable-text-color-white-theme': 'rgba(0,0,0, 0.38)',

        'gray-900': '#121212',
        'gray-800': '#272727',
        'gray-700': '#3C3C3C',
        'gray-600': '#515151',
        'gray-500': '#666666',
        'gray-400': '#7B7B7B',
        'gray-300': '#909090',
        'gray-200': '#A6A6A6',
        'gray-100': '#BBBBBB',
        'gray-50': '#D0D0D0',
      },
    },
  },
  plugins: [],
}
export default config

import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  darkMode: 'class',
  attributify: false,
  theme: {
    extend: {
      screens: {
        sm: '768px',
        md: '992px',
        lg: '1200px',
        xl: '1920px'
      }
    }
  }
})

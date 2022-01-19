import { defineConfig } from 'windicss/helpers'
// import plugin from 'windicss/plugin'

// function range(size, startAt = 1) {
//   return Array.from(Array(size).keys()).map((i) => i + startAt)
// }

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git']
  },
  darkMode: 'class',
  attributify: false,
  theme: {
    extend: {
      backgroundColor: {
        // 暗黑背景色
        'v-dark': 'var(--dark-bg-color)'
      }
      // screens: {
      //   sm: '768px',
      //   md: '992px',
      //   lg: '1200px',
      //   xl: '1920px'
      // }
    }
    // height: {
    //   ...range(50).map((i) => `h-${i}px`)
    // },
    // margin: {
    //   // ...range(50).map((i) => `mt-${i}px`),
    //   // ...range(50).map((i) => `mr-${i}px`),
    //   // ...range(50).map((i) => `mb-${i}px`),
    //   // ...range(50).map((i) => `ml-${i}px`)
    // }
  }
  // plugins: [
  //   plugin(({ addComponents }) => {
  //     addComponents({
  //       '.hover-tigger': {
  //         display: 'flex',
  //         height: '100%',
  //         padding: '1px 10px 0',
  //         cursor: 'pointer',
  //         alignItems: 'center',
  //         transition: 'background var(--transition-time-02)',
  //         '&:hover': {
  //           backgroundColor: '#f6f6f6'
  //         }
  //       },
  //       '.border-bottom': {
  //         position: 'relative',
  //         '&:after': {
  //           position: 'absolute',
  //           bottom: '0',
  //           left: '0',
  //           width: '100%',
  //           height: '1px',
  //           borderTop: '1px solid var(--top-tool-border-color)',
  //           content: ''
  //         }
  //       }
  //     })
  //   })
  // ]
})

import { defineConfig } from 'windicss/helpers'

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
  // Plugin: [
  //   require('@windicss/plugin-animations')({
  //     settings: {
  //       animatedSpeed: 1000,
  //       heartBeatSpeed: 1000,
  //       hingeSpeed: 2000,
  //       bounceInSpeed: 750,
  //       bounceOutSpeed: 750,
  //       animationDelaySpeed: 1000
  //     }
  //   })
  // ]
})

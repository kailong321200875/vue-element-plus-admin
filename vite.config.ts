import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import eslintPlugin from 'vite-plugin-eslint'
import ElementPlus from 'unplugin-element-plus/vite'
import viteSvgIcons from 'vite-plugin-svg-icons'
import commonjsExternals from 'vite-plugin-commonjs-externals'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/dist-pro/',
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    ElementPlus({
      useSource: false
    }),
    Components({
      dts: true,
      resolvers: [ElementPlusResolver()]
    }),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
    }),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
      // 压缩
      svgoOptions: true
    }),
    commonjsExternals({
      externals: ['path']
    })
  ],

  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "./src/styles/variables.less";',
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: /\@\//,
        replacement: pathResolve('src') + '/'
      },
      {
        find: /\_v\//,
        replacement: pathResolve('src/views') + '/'
      },
      {
        find: /\_c\//,
        replacement: pathResolve('src/components') + '/'
      }
    ]
  },
  build: {
    sourcemap: true
  }
})

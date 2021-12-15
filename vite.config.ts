import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// import Components from 'unplugin-vue-components/vite'
// import AutoImport from 'unplugin-auto-import/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import EslintPlugin from 'vite-plugin-eslint'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Icons from 'unplugin-icons/vite'
import StyleImport, { ElementPlusResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = null
  if (command === 'serve') {
    env = loadEnv(process.argv[4], root)
  }
  else {
    env = loadEnv(mode, root)
  }

  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      Vue(),
      VueJsx(),
      WindiCSS(),
      StyleImport({
        resolves: [ElementPlusResolve()]
      }),
      // AutoImport({
      //   imports: [
      //     'vue',
      //     'vue-router',
      //     'vue-i18n',
      //     '@vueuse/core'
      //   ],
      //   dts: 'src/types/auto-imports.d.ts'
      // }),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      }),
      // Components({
      //   dirs: ['src/components'],
      //   extensions: ['vue', 'md'],
      //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      //   // custom resolvers
      //   resolvers: [
      //     ElementPlusResolver(),
      //     IconsResolver({
      //       prefix: false,
      //       enabledCollections : ['ep']
      //     })
      //   ],
      //   dts: 'src/types/components.d.ts'
      // }),
      EslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
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
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        },
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    build: {
      minify: 'terser',
      outDir: env.VITE_OUT_DIR,
      sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
      brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      }
    },
    server: {
      proxy: {
        // 字符串简写写法
        '/foo': 'http://localhost:4567/foo',
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        // 正则表达式写法
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/fallback/, '')
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types'
      ]
    }
  }
}

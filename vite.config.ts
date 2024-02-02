import { resolve } from 'path'
import { loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import progress from 'vite-plugin-progress'
import EslintPlugin from 'vite-plugin-eslint'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { viteMockServe } from 'vite-plugin-mock'
import PurgeIcons from 'vite-plugin-purge-icons'
import ServerUrlCopy from 'vite-plugin-url-copy'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      Vue({
        script: {
          // 开启defineModel
          defineModel: true
        }
      }),
      VueJsx(),
      ServerUrlCopy(),
      progress(),
      env.VITE_USE_ALL_ELEMENT_PLUS_STYLE === 'false'
        ? createStyleImportPlugin({
            resolves: [ElementPlusResolve()],
            libs: [
              {
                libraryName: 'element-plus',
                esModule: true,
                resolveStyle: (name) => {
                  if (name === 'click-outside') {
                    return ''
                  }
                  return `element-plus/es/components/${name.replace(/^el-/, '')}/style/css`
                }
              }
            ]
          })
        : undefined,
      EslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true
      }),
      PurgeIcons(),
      env.VITE_USE_MOCK === 'true'
        ? viteMockServe({
            ignore: /^\_/,
            mockPath: 'mock',
            localEnabled: !isBuild,
            prodEnabled: isBuild,
            injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'

          setupProdMockServer()
          `
          })
        : undefined,
      ViteEjsPlugin({
        title: env.VITE_APP_TITLE
      }),
      UnoCSS()
    ],

    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
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
    esbuild: {
      pure: env.VITE_DROP_CONSOLE === 'true' ? ['console.log'] : undefined,
      drop: env.VITE_DROP_DEBUGGER === 'true' ? ['debugger'] : undefined
    },
    build: {
      target: 'es2015',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true',
      // brotliSize: false,
      rollupOptions: {
        plugins: env.VITE_USE_BUNDLE_ANALYZER === 'true' ? [visualizer()] : undefined,
        // 拆包
        output: {
          manualChunks: {
            'vue-chunks': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
            'element-plus': ['element-plus'],
            'wang-editor': ['@wangeditor/editor', '@wangeditor/editor-for-vue'],
            echarts: ['echarts', 'echarts-wordcloud']
          }
        }
      },
      cssCodeSplit: !(env.VITE_USE_CSS_SPLIT === 'false')
    },
    server: {
      port: 4000,
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: false
      },
      host: '0.0.0.0'
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        '@iconify/iconify',
        '@vueuse/core',
        'axios',
        'qs',
        'echarts',
        'echarts-wordcloud',
        'qrcode',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
        'vue-json-pretty',
        '@zxcvbn-ts/core',
        'dayjs',
        'cropperjs'
      ]
    }
  }
}

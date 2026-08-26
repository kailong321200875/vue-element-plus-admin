import { defineConfig, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  shortcuts: {
    'header-action':
      'h-full flex cursor-pointer items-center px-10px pt-1px pb-0 transition-colors duration-200 hover:bg-[var(--top-header-hover-color)] dark:hover:bg-[var(--el-bg-color-overlay)]'
  },
  presets: [presetUno({ dark: 'class', attributify: false })],
  transformers: [transformerVariantGroup()],
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|ts)($|\?)/]
    }
  }
})

import { defineConfig, toEscapedSelector as e, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
// color: ${JSON.stringify(rules)} ${JSON.stringify(variantHandlers)};

const POSITION_MAP = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
}

export default defineConfig({
  // ...UnoCSS options
  rules: [
    [
      /^custom-hover$/,
      ([], { rawSelector }) => {
        const selector = e(rawSelector)
        return `
${selector} {
  display: flex;
  height: 100%;
  padding: 1px 10px 0;
  cursor: pointer;
  align-items: center;
  transition: background var(--transition-time-02);
}
/* you can have multiple rules */
${selector}:hover {
  background-color: var(--top-header-hover-color);
}
.dark ${selector}:hover {
  background-color: var(--el-bg-color-overlay);
}
`
      }
    ]
  ],
  presets: [presetUno({ dark: 'class', attributify: false })],
  transformers: [transformerVariantGroup()],
  shortcuts: {
    'layout-border__left':
      'before:(content-none absolute top-0 left-0 w-1px h-full bg-[var(--layout-border-color)]) z-10',
    'layout-border__right':
      'after:(content-none absolute top-0 right-0 w-1px h-full bg-[var(--layout-border-color)]) z-10',
    'layout-border__top':
      'before:(content-none absolute top-0 left-0 w-full h-1px bg-[var(--layout-border-color)]) z-10',
    'layout-border__bottom':
      'after:(content-none absolute bottom-0 left-0 w-full h-1px bg-[var(--layout-border-color)]) z-10'
  }
})

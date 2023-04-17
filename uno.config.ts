import { defineConfig, toEscapedSelector as e, presetUno } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  rules: [
    [
      'v-dark',
      {
        'background-color': 'var(--dark-bg-color)'
      }
    ],
    [/^border-top-(\d+)$/, (match) => ({ 'border-top-width': `${match[1]}px` })],
    [/^border-left-(\d+)$/, (match) => ({ 'border-left-width': `${match[1]}px` })],
    [/^border-right-(\d+)$/, (match) => ({ 'border-right-width': `${match[1]}px` })],
    [/^border-bottom-(\d+)$/, (match) => ({ 'border-bottom-width': `${match[1]}px` })],
    [
      /^hover-trigger(.+)$/,
      ([, name], { rawSelector, currentSelector, variantHandlers, theme }) => {
        console.log(variantHandlers)
        // if you want, you can disable the variants for this rule
        if (variantHandlers.length) return
        const selector = e(rawSelector)
        // return a string instead of an object
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
.dark ${selector} {
  background-color: var(--el-bg-color-overlay);
}
`
      }
    ]
  ],
  presets: [presetUno({ dark: 'class', attributify: false })]
})

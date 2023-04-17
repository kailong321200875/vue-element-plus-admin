import { defineConfig, toEscapedSelector as e, presetUno } from 'unocss'
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
      /^custom-b-(.+)-(\d+)$/,
      ([_, position, count], { rawSelector, rules, variantHandlers }) => {
        // custom-b-bottom-1 或者 custom-b-b-1
        const selector = e(rawSelector)
        const newPosition = POSITION_MAP[position]
        return `
${selector}:after {
  content: '';
  position: absolute;
  width: ${newPosition === 'bottom' || newPosition === 'top' ? '100%' : count + 'px'};
  height: ${newPosition === 'left' || newPosition === 'right' ? '100%' : count + 'px'};
  ${newPosition === 'bottom' ? 'bottom' : 'top'}: 0px;
  ${newPosition === 'right' ? 'right' : 'left'}: 0px;
  background-color: var(--custom-border-color-light);
}

.dark ${selector}:after {
  background-color: var(--el-border-color);
}
      `
      }
    ],
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
  presets: [presetUno({ dark: 'class', attributify: false })]
})

# Element Plus 与样式

Admin 采用“组件显式导入、样式构建期按需补齐”的方案，没有启用自动组件导入。

## 组件导入

在使用位置显式导入：

```vue
<script setup lang="ts">
  import { ElButton, ElInput } from 'element-plus'
</script>
```

显式依赖更容易搜索、重构和判断页面成本，也不会生成全局组件类型与自动导入配置。

只有 `ElLoading` 通过插件全局安装，因为 `v-loading` 指令需要应用级注册：

```ts
import { ElLoading } from 'element-plus'

app.use(ElLoading)
```

不要为了统一形式把全部 Element Plus 组件 `app.use()`。

## 样式按需导入

使用 Element Plus 官方推荐的 `unplugin-element-plus`，根据实际导入补充对应 CSS：

```ts
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  plugins: [ElementPlus()]
})
```

新增 Element Plus 组件时只需正常 import；如果构建后无样式，先检查插件是否识别了导入名称，不要在页面重复手动引入整包 CSS。

## 全局样式入口

应用在 `main.ts` 引入：

```ts
import '@vea/styles'
import 'virtual:uno.css'
```

`@vea/styles` 当前包含：

- `var.css` 中的 Element Plus 与布局主题变量。
- Element Plus 暗色 CSS variables。
- 最小 reset 与抽屉滚动条宽度修正。

页面局部样式留在组件的 scoped style；只有多个应用都需要的设计 token 或基础规则才进入共享样式包。

## UnoCSS 的职责

UnoCSS 用于页面级原子样式，配置位于 `apps/admin/uno.config.ts`：

- `presetUno()` 提供常用原子规则。
- 暗色模式通过 `.dark` class。
- variant group 支持 `hover:(...)` 等写法。

Element Plus 负责复杂交互组件，UnoCSS 负责布局和少量视觉组合，CSS variables 负责主题。三者边界清楚时，不需要再包装 BaseButton、BaseTable 等只转发 props 的组件。

## 什么时候应该封装

可以封装：

- 多处共享且有真实交互规则的组件。
- 需要统一无障碍、埋点或异常处理的入口。
- 能用稳定、较小的 props/events 描述的组件。

不建议封装：

- 只为缩短一次 Element Plus 标签。
- 仅透传全部 props、slots 和 events。
- 把业务字段配置成复杂 JSON 才能渲染的表单或表格。
- 只有一个页面使用、以后“可能复用”的组件。

## 样式排查顺序

遇到亮暗色不一致或菜单样式异常时，按层排查：

1. `<html>` 是否有正确的 `light` / `dark` class。
2. `var.css` 中语义变量是否在两种主题都定义。
3. 组件是否错误写死颜色或尺寸。
4. UnoCSS 规则是否覆盖局部样式。
5. Element Plus 样式是否按需进入构建。

优先修正变量或拥有该布局的组件，不要用全局 `!important` 掩盖结构问题。

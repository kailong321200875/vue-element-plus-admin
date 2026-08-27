# 国际化与主题

语言和主题都遵循同一原则：状态只有一个来源，切换立即反映到 DOM 和组件库，不要求刷新页面。

## 国际化结构

```text
src/config/locale.ts         语言注册表
src/locales/                 应用文案
src/plugins/vueI18n/         创建 i18n 实例
src/store/modules/locale.ts  当前语言与持久化
src/hooks/useLocale.ts       运行时切换
ConfigGlobal                 同步 Element Plus locale
```

`localeRegistry` 同时注册应用文案、展示名称和 Element Plus 语言包：

```ts
export const localeRegistry = {
  'zh-CN': {
    label: '简体中文',
    messages: zhCNMessages,
    elementLocale: zhCNElement
  },
  en: {
    label: 'English',
    messages: enMessages,
    elementLocale: enElement
  }
} as const
```

下拉选项和 vue-i18n 的 messages 都从注册表派生，避免在三个文件重复维护语言列表。

## 切换语言

```ts
const { changeLocale } = useLocale()

changeLocale('en')
```

一次调用会同步：

- vue-i18n 当前 locale。
- Locale Store，并持久化到 `vea-locale-v1`。
- `<html lang="...">`。
- ConfigGlobal 中的 Element Plus locale。
- 使用 `useTitle` 生成的浏览器标题。

所以语言切换不需要刷新。

## 新增语言

以日语为例：

1. 新建 `src/locales/ja.ts`，键结构与现有语言保持一致。
2. 导入 Element Plus 的 `element-plus/es/locale/lang/ja`。
3. 在 `localeRegistry` 添加 `ja`。

`LocaleCode`、下拉选项和消息表会自动得到新类型与数据。

当前语言包是同步导入。只有语言数量或单个包体积明显增长时，才值得改成异步加载；两种语言没必要增加切换状态和加载失败分支。

## 文案使用

```ts
const { t } = useI18n()

const title = computed(() => t('router.dashboard'))
```

表单校验文案使用函数，确保切换语言后重新校验能得到当前语言：

```ts
username: required(() => t('common.required'))
```

路由 `meta.title` 当前保存的是 i18n key，菜单、面包屑和 TagsView 应通过同一个翻译逻辑展示。

## 主题结构

亮色与暗色状态保存在 App Store：

```ts
const appStore = useAppStore()
appStore.isDark = !appStore.isDark
```

`useTheme` 监听该状态，并在 `<html>` 切换 `light` / `dark` class。状态持久化在 `vea-app-v2`，页面刷新后会恢复。

当前只支持手动亮色/暗色，没有跟随系统主题；文档和产品设置不要展示不存在的第三种模式。

## 主题变量

共享变量位于 `packages/styles/src/var.css`：

```css
html:root {
  --el-color-primary: #5b5bd6;
  --app-content-bg-color: #f6f7fb;
  --left-menu-bg-color: #fff;
}

html:root.dark {
  --el-color-primary: #818cf8;
  --app-content-bg-color: #0b1120;
  --left-menu-bg-color: #111827;
}
```

Element Plus 变量和布局语义变量在同一主题下覆盖，避免顶部导航、侧边栏和内容区各自写一套孤立颜色。

新增颜色时优先定义用途，例如 `--layout-border-color`，不要定义无语义的 `--gray-7` 后再让每个组件猜用途。

## 主题组件的边界

`ThemeSwitch` 可以保留在 `@vea/components`，因为它只接收受控状态并触发事件；Store 与 DOM 切换仍由 Admin 负责。公共组件不能直接读取 `useAppStore()`，否则其他 app 无法复用。

如果另一个应用只需要普通按钮，也可以直接调用主题动作，不必为了统一而强制使用相同展示组件。

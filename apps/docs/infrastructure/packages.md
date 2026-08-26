# Packages 设计

仓库使用 pnpm workspace，把应用和可复用能力分开：

```text
apps/
├─ admin/          # 后台应用：业务、路由、布局、API、Store
└─ docs/           # 当前文档站

packages/
├─ components/     # 极少量跨应用组件
├─ hooks/          # 与 UI 无关的逻辑 Hooks
├─ request/        # 与业务无关的 Axios 客户端
└─ styles/         # 基础样式与主题变量
```

## 当前包的职责

| 包                | 提供能力                                | 不应该包含                        |
| ----------------- | --------------------------------------- | --------------------------------- |
| `@vea/components` | `Icon`、`LocaleDropdown`、`ThemeSwitch` | 页面、业务状态、整套图标          |
| `@vea/hooks`      | `useCrud`、`useForm`、`required`        | Element Plus、接口字段、弹窗布局  |
| `@vea/request`    | Axios 生命周期、转换、错误钩子、取消    | Token Store、业务成功码、消息组件 |
| `@vea/styles`     | Reset、Element Plus 暗色变量、设计变量  | 某个页面的局部样式                |

这些包当前直接导出 TypeScript/Less 源码，由 workspace 内应用通过 Vite 编译；它们没有独立 build 产物，不应描述成已经发布的 npm 组件库。

## 依赖方向

推荐保持单向依赖：

```text
apps/*  ──────>  packages/*
                       │
packages/components ───┴─> Vue / Element Plus（peer）+ @iconify/vue
packages/hooks ───────────> Vue（peer）
packages/request ─────────> Axios
```

公共包不能反向导入 `apps/admin`。一旦需要读取 Admin Store、路由或环境变量，就说明这段能力属于应用层。

## 依赖归属与版本

- 根 `package.json` 只声明 Commitlint、Oxlint、Prettier、Stylelint、PostCSS 等全仓工具，不声明 Vue 应用运行依赖。
- 每个 app 声明自己的运行依赖和构建工具，不能依靠根目录提升出的包补齐缺失依赖。
- 每个 package 声明自己的直接依赖，并用 `peerDependencies` 表达消费方需要提供的 Vue、Element Plus 等运行环境。
- 多个 workspace 共同使用的开发版本通过 `pnpm-workspace.yaml` 的 `catalog` 统一；公共包的 peer 兼容范围仍保留独立声明。
- 根 `.npmrc` 关闭自动安装 peer，缺失依赖必须由实际使用它的 workspace 显式补齐，不能让 pnpm 静默引入未使用的框架适配包。仅对未启用的 ESLint 集成和 VitePress Algolia 搜索忽略缺失提示。

`catalog:` 只统一版本来源，不会让未声明依赖的 workspace 自动获得该包。新增 app 时仍应逐项声明实际使用的依赖。

## 为什么不继续封装所有组件

Table、Search、Dialog、Detail 等展示组件看起来相似，但字段权限、移动端布局、编辑流程和接口约定通常不同。强行放进 packages 会让调用方传入越来越多配置，最后只是把页面模板换成一套更难读的 DSL。

适合进入 packages 的代码通常同时满足：

1. 已经有两个真实调用方。
2. API 不依赖某个业务实体。
3. 不读取应用私有 Store、路由和环境变量。
4. 复用后不会迫使应用打包大量未使用资源。
5. 能独立测试，或至少能用一个很小的示例说明边界。

只有“以后可能复用”不够。

## 新建一个共享包

在 `packages/example/package.json` 定义 workspace 源码入口：

```json
{
  "name": "@vea/example",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": {
      "import": "./src/index.ts",
      "types": "./src/index.ts"
    }
  }
}
```

应用声明 workspace 依赖：

```json
{
  "dependencies": {
    "@vea/example": "workspace:*"
  }
}
```

然后从包名导入，不要通过跨目录相对路径访问源码：

```ts
import { example } from '@vea/example'
```

## 多应用下的资源控制

公共包只保存渲染器和协议，具体资源由各 app 注册。图标就是这一原则的实际例子：Admin 只静态导入当前实际使用的图标，另一个 app 可以注册完全不同的白名单，不会被公共组件强制打进整套资源。

同样地，请求包只提供客户端工厂；每个 app 分别配置自己的 baseURL、token、响应码与 UI 提示。

## 发布前需要补什么

如果以后要把 packages 发布到 workspace 之外，至少需要再补：

- 独立构建与类型声明产物。
- 明确的 `exports` 和 CSS 发布策略。
- peerDependencies 与最低版本测试。
- 包级 README、变更记录和发布流程。
- 消费方打包测试，验证 tree-shaking 与样式行为。

在只有当前 monorepo 消费时，不必提前引入这些维护成本。

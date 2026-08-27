<div align="center">
  <a href="https://github.com/kailong321200875/vue-element-plus-admin">
    <img width="96" src="./apps/admin/public/logo.png" alt="ElementAdmin 标志">
  </a>

  <h1>ElementAdmin v3</h1>

  <p>面向真实业务的轻量、可扩展 Vue 3 后台管理模板。</p>

[![CI](https://github.com/kailong321200875/vue-element-plus-admin/actions/workflows/ci.yml/badge.svg?branch=release)](https://github.com/kailong321200875/vue-element-plus-admin/actions/workflows/ci.yml) [![license](https://img.shields.io/github/license/kailong321200875/vue-element-plus-admin.svg)](./LICENSE) [![last commit](https://img.shields.io/github/last-commit/kailong321200875/vue-element-plus-admin.svg)](https://github.com/kailong321200875/vue-element-plus-admin/commits/v3) [![stars](https://img.shields.io/github/stars/kailong321200875/vue-element-plus-admin.svg)](https://github.com/kailong321200875/vue-element-plus-admin/stargazers)
</div>

[English](./README.md) | **中文**

## 关于 v3

ElementAdmin v3 是一个基于 Vue 3 与 Element Plus 的后台管理模板。它不再追求大量演示页面和展示型组件封装，只保留后台应用长期稳定的基础能力：登录会话恢复、服务端动态路由、布局、TagsView、请求、表单、CRUD 状态、主题和国际化。具体业务页面、领域模型和交互流程由应用自行实现。

仓库采用 pnpm workspace。与应用无关的能力放在 `packages`，以后新增应用时可以复用，同时不会把 Admin 私有的路由、Store 或资源一起引入。

## 核心特性

- **纯服务端动态路由**：业务路由由接口返回并在运行时注册，不再维护第二份前端角色过滤路由表。
- **四种常见布局**：经典侧边栏、顶部导航、混合导航和双列侧边栏共用同一份路由树。
- **移动端适配**：屏幕小于 768px 时自动使用移动端侧边栏。
- **明确的 Packages 边界**：通用组件、CRUD/Form Hooks、请求客户端和主题变量相互独立。
- **图标完全离线**：每个 App 只静态注册自己使用的 Iconify 图标，生产运行不依赖 CDN。
- **语言与主题即时切换**：Vue I18n、Element Plus、HTML lang 和持久化状态保持同步。
- **克制的展示层**：不提供 BaseButton，也不封装配置复杂的 Table、Search、Dialog、Detail。
- **独立文档应用**：基于 VitePress，支持响应式布局、暗色模式和本地搜索。

## 技术栈

- Vue 3.5
- Vite 8
- TypeScript
- Element Plus 2
- Vue Router 5
- Pinia 4
- Vue I18n 11
- UnoCSS
- Axios
- ECharts 6
- VitePress 1
- Oxlint、Prettier、Stylelint

## 工作区结构

```text
apps/
├─ admin/          后台管理应用
└─ docs/           v3 文档站

packages/
├─ components/     少量跨应用 UI 基础组件
├─ hooks/          与 UI 无关的 useCrud、useForm
├─ request/        与业务无关的 Axios 客户端
└─ styles/         基础样式与主题变量
```

当前 packages 直接导出 workspace 源码，由各 Vite 应用编译，并不是已经预构建发布的 npm 包。

## 环境要求

- Node.js `^20.19.0 || ^22.13.0 || >=24.0.0`
- pnpm `>=9.5.0`，仓库固定使用 `pnpm@9.15.3`
- Git

## 快速开始

```bash
git clone --branch v3 --single-branch https://github.com/kailong321200875/vue-element-plus-admin.git
cd vue-element-plus-admin
pnpm install
pnpm dev:admin
```

Admin 默认运行在 `http://localhost:4000/`。

```text
用户名：admin
密码：admin
```

本地开发通过 Mock Server 提供内置接口；当 `VITE_USE_MOCK=true` 时，生产构建也会包含浏览器端 Mock 适配器，因此静态演示站无需后端即可完整使用。

## 常用命令

| 命令                    | 说明                            |
| ----------------------- | ------------------------------- |
| `pnpm dev:admin`        | 启动 Admin 开发服务器           |
| `pnpm build:admin`      | 使用生产模式构建 Admin          |
| `pnpm build:admin:dev`  | 使用开发环境变量构建 Admin      |
| `pnpm build:admin:test` | 使用测试环境变量构建 Admin      |
| `pnpm preview:admin`    | 预览 Admin 生产构建             |
| `pnpm typecheck:admin`  | 执行 Vue 与 TypeScript 类型检查 |
| `pnpm dev:docs`         | 启动文档站                      |
| `pnpm build:docs`       | 构建文档站                      |
| `pnpm preview:docs`     | 预览文档构建                    |
| `pnpm lint`             | 使用 Oxlint 检查整个工作区      |

包级测试：

```bash
pnpm --filter @vea/hooks test
pnpm --filter @vea/request test
```

## 文档

- 在线演示：[element-plus-admin.cn](https://element-plus-admin.cn/)
- v3 文档：[docs.element-plus-admin.cn](https://docs.element-plus-admin.cn/)

在本地启动 v3 文档：

```bash
pnpm dev:docs
```

默认地址为 `http://localhost:4002/`。

- [快速开始](./apps/docs/guide/getting-started.md)
- [目录与架构](./apps/docs/guide/architecture.md)
- [动态路由与权限](./apps/docs/core/dynamic-routing.md)
- [Request 请求管理](./apps/docs/core/request.md)
- [CRUD](./apps/docs/capabilities/crud.md)
- [表单](./apps/docs/capabilities/form.md)
- [构建与部署](./apps/docs/development/build-deploy.md)

[element-plus-admin-doc.cn](https://element-plus-admin-doc.cn/) 对应旧版架构。新项目请以 v3 文档和当前分支代码为准。

## 动态路由约定

只有根 Layout、登录、重定向和错误页等运行外壳是静态路由。登录后，接口返回当前用户可访问的完整路由树。

| `component` 值             | 含义                            |
| -------------------------- | ------------------------------- |
| `#`                        | 后台 Layout                     |
| `##`                       | 不挂载页面组件的路由分组        |
| `views/Dashboard/Analysis` | `apps/admin/src/views` 下的页面 |

路由图标必须由消费它的 App 注册，路由 name 必须全局唯一。

## 开发约定

- 业务 API 和模型放在 `apps/admin`，公共包不能反向导入应用代码。
- 只有形成稳定、与应用无关的契约后，才把代码下沉到 `packages`。
- Element Plus 组件显式导入，构建时按需补充组件样式。
- 使用 Oxlint，不再新增 ESLint 配置。
- 后端路由约定、路由多语言 key 和当前 App 的图标注册表需要保持一致。

提交前会通过 Husky 执行 vue-tsc、lint-staged 和 Commitlint。提交信息遵循 Conventional Commits：

```text
feat: add user management
fix: resolve dynamic route refresh
docs: update deployment guide
refactor: simplify request client
```

## 如何贡献

欢迎提交 Issue 和 Pull Request。

1. Fork 仓库。
2. 创建分支：`git checkout -b feat/your-feature`。
3. 使用 Conventional Commit 信息提交修改。
4. 推送分支，并向 `master` 发起 Pull Request。

项目历史请查看[更新日志](./CHANGELOG.md)。

## 浏览器支持

支持现代浏览器，不支持 Internet Explorer。

## 赞助

如果这个项目对你有帮助，欢迎赞助支持。

[PayPal](https://www.paypal.com/paypalme/ckl94)

<img width="240" src="https://github.com/kailong321200875/my-image/raw/master/pay.jpg" alt="赞助二维码">

## 许可证

[MIT](./LICENSE)

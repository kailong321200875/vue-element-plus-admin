# 快速开始

## 环境要求

- Node.js：`^20.19.0`、`^22.13.0` 或 `>=24.0.0`
- pnpm：`>=9.5.0`
- Git：用于获取代码和运行 Husky

仓库通过 `packageManager` 固定 pnpm 主版本。已启用 Corepack 时，可执行：

```bash
corepack enable
corepack prepare pnpm@9.15.3 --activate
```

## 获取与安装

```bash
git clone --branch v3 --single-branch https://github.com/kailong321200875/vue-element-plus-admin.git
cd vue-element-plus-admin
pnpm install
```

请保留 `pnpm-lock.yaml`。遇到安装问题时，先检查 Node、pnpm 和网络环境，不要把删除锁文件作为默认修复方式。

## 启动 Admin

在仓库根目录运行：

```bash
pnpm dev:admin
```

默认地址为 `http://localhost:4000/`。登录使用：

```text
用户名：admin
密码：admin
```

如果端口被占用，Vite 会选择下一个可用端口，请以终端输出为准。

## 启动文档

```bash
pnpm dev:docs
```

默认地址为 `http://localhost:4002/`。文档与 Admin 是两个独立 workspace，可以同时运行。

## 常用命令

| 命令                    | 说明                            |
| ----------------------- | ------------------------------- |
| `pnpm dev:admin`        | 启动 Admin 开发环境             |
| `pnpm build:admin`      | 构建生产版本                    |
| `pnpm build:admin:dev`  | 按开发环境变量构建              |
| `pnpm build:admin:test` | 按测试环境变量构建              |
| `pnpm preview:admin`    | 预览 Admin 生产构建             |
| `pnpm typecheck:admin`  | 执行 Vue 与 TypeScript 类型检查 |
| `pnpm dev:docs`         | 启动文档站                      |
| `pnpm build:docs`       | 构建文档站                      |
| `pnpm preview:docs`     | 预览文档构建                    |
| `pnpm lint`             | 使用 Oxlint 检查整个工作区      |

## 第一次验证

完成登录后建议确认以下行为：

1. 首页和多级菜单均由动态路由接口生成。
2. 刷新多级菜单页面后不会跳转到 404。
3. 四种布局可以切换，移动端只显示侧边栏布局。
4. 语言切换立即生效，无需刷新。
5. 明暗主题会被持久化。
6. TagsView 的刷新、关闭和固定标签正常工作。

## IDE 建议

推荐使用 VS Code 或兼容编辑器，并安装：

- Vue - Official
- UnoCSS
- i18n Ally
- Prettier
- Stylelint
- DotENV

Oxlint 通过命令行和 Git Hook 执行，不要求项目额外维护 ESLint 配置。

## 下一步

- 想理解代码边界：阅读[目录与架构](/guide/architecture)。
- 准备接后端：阅读[Request 请求管理](/core/request)和[Mock 与接口联调](/development/mock)。
- 准备配置菜单：阅读[动态路由与权限](/core/dynamic-routing)。

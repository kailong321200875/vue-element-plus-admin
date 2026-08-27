# 目录与架构

## 工作区结构

```text
vue-element-plus-admin/
├─ apps/
│  ├─ admin/                 # 管理后台应用
│  └─ docs/                  # 当前文档站
├─ packages/
│  ├─ components/            # 可跨应用复用的基础 UI
│  ├─ hooks/                 # CRUD 与表单状态能力
│  ├─ request/               # 与 UI、业务无关的请求客户端
│  └─ styles/                # 共享样式与主题变量
├─ package.json              # 工作区统一命令与工具依赖
├─ pnpm-workspace.yaml       # apps/* 与 packages/*
└─ pnpm-lock.yaml            # 唯一依赖锁文件
```

## 依赖方向

```text
apps/admin ─────┬──> @vea/components
                ├──> @vea/hooks
                ├──> @vea/request
                └──> @vea/styles

packages/*  ────X──> apps/admin
```

应用可以依赖共享包，共享包不能反向依赖某个应用。这个约束保证未来新增 `apps/merchant` 或 `apps/portal` 时，不会把 Admin 的登录态、路由或业务文案一起带过去。

## Admin 目录

```text
apps/admin/
├─ mock/                     # 开发期 Mock 接口
├─ public/                   # 原样复制的静态资源
├─ src/
│  ├─ api/                   # 领域接口与类型
│  ├─ assets/                # 参与构建的图片资源
│  ├─ components/            # 仅 Admin 使用的布局/功能组件
│  ├─ config/                # 应用、语言等配置
│  ├─ hooks/                 # 与 Admin Store/DOM 绑定的 Hooks
│  ├─ layout/                # 四种后台布局
│  ├─ locales/               # 业务语言包
│  ├─ plugins/               # Element Plus、ECharts、I18n 初始化
│  ├─ request/               # Admin 请求实例与业务响应处理
│  ├─ router/                # 仅保留常量路由
│  ├─ store/                 # Pinia 状态模块
│  ├─ utils/                 # 当前仅保留路由相关工具
│  └─ views/                 # 路由页面
├─ types/                    # 环境变量、路由与组件类型扩展
└─ vite.config.ts
```

## 启动顺序

`src/main.ts` 依次完成：

1. 创建 Vue 应用。
2. 注册 Pinia，并加载当前版本的持久化状态。
3. 恢复登录态并预加载动态路由。
4. 注册返回值式导航守卫。
5. 创建 Vue I18n 实例。
6. 注册应用图标和全局 `Icon`。
7. 注册 Element Plus 指令能力。
8. 安装 Vue Router 并挂载应用。

动态路由必须在 Router 首次导航前准备好，否则刷新业务地址时会先触发 `No match found`。当前启动顺序就是为了解决这个问题。

## 什么应该进入 Packages

一个能力同时满足以下条件时，才考虑下沉：

- 不读取 Admin 的 Store、Router、环境变量或业务接口。
- 输入输出可以通过 props、参数和返回值表达。
- 至少有两个应用可能以相同方式使用。
- API 在业务变化后仍然稳定。

例如 `@vea/request` 只处理请求生命周期和取消，不知道 token 如何存储；`apps/admin/src/request` 再接入用户 Store 与 Element Plus 消息提示。

## 什么应该留在 Admin

- Layout、Menu、TagsView、Breadcrumb。
- 登录页、Dashboard 和业务页面。
- 用户、权限、语言和布局 Store。
- 路由接口契约与组件路径转换。
- 对 Element Plus 或浏览器 DOM 有强依赖的应用行为。

## 新增应用

新增应用时建议：

1. 在 `apps/<name>` 创建独立 `package.json`。
2. 只声明实际使用的 workspace 包。
3. 创建自己的 request 实例、图标白名单、路由和 Store。
4. 不从 `apps/admin/src` 直接导入文件。
5. 当重复实现稳定后，再提取到 `packages`。

这种方式允许多个应用共享基础能力，同时保持独立构建和按需打包。

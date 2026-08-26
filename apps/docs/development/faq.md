# 常见问题

## 本地打开提示没有 `/dashboard/analysis` 路由

动态路由在登录态恢复后从接口注册。常见原因：

1. 浏览器保存了旧 token，但 Mock 或后端没有正常返回路由。
2. 首次导航发生在 `router.addRoute()` 之前。
3. 服务端 component 字符串找不到对应页面。
4. 曾保存旧版本状态，路由结构已经变化。

先查看 `/mock/role/list` 或真实路由接口，再清理 `vea-session-v1` 重新登录。当前启动流程应在挂载 Router 前执行 `setupPermission()`，注册后 replace 当前地址。

不要通过新增一条静态 `/dashboard/analysis` 来掩盖问题；首页也属于服务端动态路由。

## Vue Router 警告 `next() callback is deprecated`

导航守卫应直接返回：

```ts
router.beforeEach(async (to) => {
  if (!isLoggedIn) return '/login'
  if (!routesReady) {
    await loadRoutes()
    return { ...to, replace: true }
  }
  return true
})
```

不要继续使用第三个参数 `next`。项目当前按返回值风格编写；如果警告再次出现，搜索 `beforeEach`、`beforeResolve` 和 `beforeEnter` 中的旧回调。

## 混合导航点击多级菜单进入 404

检查子路由 path 是否为相对路径，父级 redirect 是否指向真实叶子节点，以及混合布局是否拼接了完整父路径。目录节点应使用 `component: '##'`，不能当成页面跳转。

## 动态路由菜单有文字但没有图标

服务端只返回图标名称，当前 app 仍需在 `src/icons.ts` 静态注册对应图标。名称必须完全一致，例如 `mdi:file-document-outline`。

详见[图标注册](/infrastructure/icons)。

## 图标看起来很小，修改 size 仍无效

通常不是 Icon 的 width/height，而是父容器的 padding、固定尺寸或 `flex-shrink` 在压缩可用空间。浏览器中检查图标最终盒模型，并给图标容器明确尺寸、`flex: none` 和合理 gap。修复拥有该布局的菜单组件，不要同时改动其他布局。

## 纵向菜单展开或收起时跳动

常见原因是 active 背景、border、padding 或图标占位只在展开态出现，导致元素高度变化。菜单项的高度、横向 padding、图标槽宽和箭头槽宽应在所有状态固定；动画只改变子菜单高度或透明度。

## 切换语言后为什么以前需要刷新

旧版可能只修改持久化值，没有同步 vue-i18n 与 Element Plus。v3 的 `changeLocale()` 会同步 i18n locale、Store、HTML lang 和 ConfigProvider，正常情况下立即生效。

如果个别文案不更新，检查它是否在 setup 时被写成普通字符串，而不是通过 `t()`、computed 或渲染函数读取。

## 为什么生产包的 Mock 接口失效

这是当前设计。`vite-plugin-mock` 只服务本地开发，生产构建不会注册 Mock Server；部署环境必须提供真实后端接口。

## 为什么没有 BaseButton、Table、Search、Dialog、Detail

它们大多只是展示层透传或高度配置化的页面模板，会把业务差异变成复杂 props。v3 只保留可复用的逻辑能力 `useCrud`、`useForm` 和 Request，页面直接组合 Element Plus。

## 为什么 Hooks 下没有 `web` 文件夹

当前 Hook 数量少，额外目录没有表达新的边界。`src/hooks/useLocale.ts` 比 `src/hooks/web/useLocale.ts` 更直接。等出现 native、server 等真实平台分层时再增加目录。

## Request 返回的是业务数据还是完整响应

Admin API 返回 `ApiResponse<Data>`：

```ts
const response = await loginApi(params)
const loginResult = response.data
```

Blob 是例外，会返回原始 AxiosResponse。Authorization 当前直接发送 token，不会自动添加 `Bearer `。

## 部署子目录后静态资源 404

把 `VITE_BASE_PATH` 设为实际子目录，并以 `/` 开头和结尾，然后重新构建。只修改服务器目录、不重新构建，已经写入 HTML 的资源地址不会变化。

## 旧文档里的命令为什么不能运行

旧文档对应 v2 架构。v3 已迁移到 `apps + packages`，根命令改为 `pnpm dev:admin`、`pnpm build:admin` 等；Node、Vite、路由、图标、Lint 和组件边界也已经变化。

以本站和当前 `package.json` 为准，不要继续使用 `pnpm dev`、`pnpm build:pro`、`src/axios`、ESLint、在线图标或前端角色路由过滤等旧说明。

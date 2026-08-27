# 状态管理

Admin 使用 Pinia，并通过 `pinia-plugin-persistedstate` 只持久化需要跨刷新保留的数据。

## Store 一览

| Store        | 职责                                   | 是否持久化 |
| ------------ | -------------------------------------- | ---------- |
| `app`        | 布局、折叠、主题、页面加载和移动端状态 | 部分       |
| `user`       | token、用户信息、记住账号              | 是         |
| `locale`     | 当前语言                               | 是         |
| `permission` | 当前登录态的动态路由和菜单             | 否         |
| `tagsView`   | 标签和 KeepAlive 名单                  | 否         |

## 持久化原则

只持久化能够安全序列化、刷新后仍然有效的最小状态：

```ts
persist: {
  key: 'vea-app-v2',
  pick: ['collapse', 'layout', 'isDark']
}
```

以下状态不持久化：

- Vue Router 路由记录与组件函数。
- 页面加载状态和移动端媒体状态。
- TagsView 的完整 RouteLocation 对象。
- 请求 loading、错误和临时表单数据。

## 应用内与应用外使用

组件 `setup` 中直接使用标准 Hook：

```ts
const appStore = useAppStore()
```

导航守卫、Request 拦截流程等组件外环境使用绑定了全局 Pinia 实例的方法：

```ts
const appStore = useAppStoreWithOut()
```

不要在组件外直接调用 `useAppStore()` 并依赖隐式 active Pinia，启动顺序变化时容易失效。

## 用户会话

User Store 只有同时存在 token 与用户信息时才认为已登录：

```ts
isAuthenticated(): boolean {
  return Boolean(this.token && this.userInfo)
}
```

登录成功调用 `setSession()`；退出调用 `logout()`。`clearSession()` 是整个会话清理的单一入口，会联动权限路由、TagsView 和 Router 重置。

当前 User Store 会把 token、userInfo、rememberMe 和 rememberedUsername 写入 localStorage，且没有 token 过期与刷新机制。这适合模板演示和普通后台，但 localStorage token 会受到 XSS 风险影响。高安全业务应结合后端能力评估 HttpOnly Cookie、短期内存 token、刷新机制与 CSP，而不是直接沿用模板默认会话方案。

## 权限状态

Permission Store 保存：

- `routers`：常量路由与动态路由的合集，用于菜单。
- `addRouters`：本次登录动态添加的业务路由。
- `isAddRouters`：防止重复请求和注册。

刷新页面时，根据持久化的 User Store 重新请求动态路由，不从本地存储恢复 Permission Store。

## TagsView 状态

`visitedViews` 和 `cachedViews` 始终通过 Store action 同步更新。组件不应直接 `push` 或 `splice` 这两个数组，否则 KeepAlive 名单可能与标签不一致。

## Locale 状态

Locale Store 只保存语言码，语言包和 Element Plus locale 来自 `localeRegistry`：

```ts
state: () => ({ lang: DEFAULT_LOCALE })
```

这样持久化数据不会包含大对象，也不会与代码中的语言包版本产生冲突。

## 状态版本

公共模板不内置旧版 localStorage 迁移。持久化 key 使用版本后缀；状态结构发生不兼容变化时，优先升级 key 并回退默认值。已有线上数据需要迁移时，由具体业务应用提供一次性迁移逻辑，不让公共 Store 长期背负历史兼容分支。

## 新增 Store

```ts
import { defineStore } from 'pinia'
import { store } from '../index'

export const useExampleStore = defineStore('example', {
  state: () => ({ value: '' }),
  actions: {
    reset() {
      this.$reset()
    }
  }
})

export const useExampleStoreWithOut = () => useExampleStore(store)
```

只有确实需要在组件外使用时，才导出 `WithOut` 版本。

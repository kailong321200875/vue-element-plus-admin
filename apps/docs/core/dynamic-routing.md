# 动态路由与权限

v3 不维护业务静态路由，也不在前端过滤一份完整路由表。登录后，服务端返回当前用户可访问的路由，前端将其转换为 Vue Router 记录并动态注册。

## 路由来源

常量路由只包含运行外壳：

- `/`：Layout 容器与首页重定向
- `/login`：登录页
- `/redirect/*`：TagsView 刷新中转页
- `/404`：错误页
- `/:pathMatch(.*)*`：兜底路由

首页和多级菜单等业务页面来自 `getRouteListApi()`，Mock 环境对应 `/mock/role/list`。

## 接口契约

服务端路由的核心结构：

```ts
interface AppCustomRouteRecordRaw {
  path: string
  name: string
  component: string
  redirect?: string
  meta: {
    title?: string
    icon?: string
    hidden?: boolean
    alwaysShow?: boolean
    noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
    activeMenu?: string
    noTagsView?: boolean
  }
  children?: AppCustomRouteRecordRaw[]
}
```

示例：

```json
{
  "path": "/dashboard",
  "name": "Dashboard",
  "component": "#",
  "redirect": "/dashboard/analysis",
  "meta": {
    "title": "router.dashboard",
    "icon": "mdi:view-dashboard"
  },
  "children": [
    {
      "path": "analysis",
      "name": "Analysis",
      "component": "views/Dashboard/Analysis",
      "meta": {
        "title": "router.dashboard",
        "affix": true,
        "noCache": true
      }
    }
  ]
}
```

## component 规则

| 值                         | 含义                                                |
| -------------------------- | --------------------------------------------------- |
| `#`                        | 使用后台 Layout，通常用于顶层目录                   |
| `##`                       | 纯路由分组，不渲染额外组件                          |
| `views/Dashboard/Analysis` | 映射到 `src/views/Dashboard/Analysis.vue` 或 `.tsx` |

页面组件通过 `import.meta.glob('../views/**/*.{vue,tsx}')` 建立白名单。接口不能返回任意模块路径，只能命中 `views` 中实际存在的文件。

::: warning 路径大小写

组件路径必须与文件系统大小写完全一致。macOS 默认文件系统可能不报错，但 Linux 构建会失败。

:::

## meta 字段

| 字段         | 作用                                 |
| ------------ | ------------------------------------ |
| `title`      | 菜单、面包屑和 TagsView 的 i18n key  |
| `icon`       | 已在当前应用注册的 Iconify 名称      |
| `hidden`     | 不显示在菜单中                       |
| `alwaysShow` | 即使只有一个可见子项，也保留父级菜单 |
| `noCache`    | 不加入 KeepAlive                     |
| `breadcrumb` | 是否出现在面包屑中                   |
| `affix`      | 固定在 TagsView，不能关闭            |
| `activeMenu` | 指定另一个菜单路径为激活态           |
| `noTagsView` | 不生成标签页                         |

## 注册流程

```text
恢复登录态
   ↓
getRouteListApi
   ↓
generateRoutesByServer
   ↓
permissionStore.generateRoutes
   ↓
router.addRoute × N
   ↓
重新进入目标地址
```

`ensureDynamicRoutes()` 使用 `isAddRouters` 防止重复注册。首次在导航守卫中完成注册时，会返回 `{ path: to.fullPath, replace: true }`，让 Router 使用新的路由表重新解析目标地址。

导航守卫采用 Vue Router 推荐的返回值写法，不再使用已废弃的 `next()`：

```ts
router.beforeEach(async (to) => {
  if (!userStore.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  const routesAdded = await ensureDynamicRoutes()
  if (routesAdded) return { path: to.fullPath, replace: true }

  return true
})
```

## 新增业务页面

1. 在 `src/views` 下创建页面组件。
2. 为页面设置稳定且唯一的组件名与路由 `name`。
3. 后端返回对应的 `component` 路径。
4. 在语言包中添加 `meta.title` 使用的 key。
5. 如果配置图标，在 `src/icons.ts` 中注册。
6. 退出后重新登录，或执行完整路由重置后重新获取。

仅调用 `permissionStore.reset()` 不会移除已经注册到 Vue Router 的记录。手动刷新路由至少需要依次执行 `resetRouter()`、重置 Permission Store、按需清空 TagsView，再调用 `ensureDynamicRoutes()`。重新登录，或通过 `userStore.clearSession()` 后重建会话，是当前更安全的入口。

## 多级菜单

子路由 `path` 推荐使用相对路径：

```text
/level
└─ menu1
   └─ menu1-1
      └─ menu1-1-1
```

最终路径为 `/level/menu1/menu1-1/menu1-1-1`。`pathResolve()` 负责合并父子路径，同时保留绝对路径和外链。

## 退出与重置

退出登录时会同时：

1. 清除 token 和用户信息。
2. 重置 Permission Store。
3. 清空 TagsView 与 KeepAlive 名单。
4. 调用 `resetRouter()` 移除业务动态路由。
5. 跳转到登录页。

不要持久化动态路由对象。页面组件函数无法可靠序列化，刷新时应根据已持久化的登录态重新请求路由。

## 外链

以 `http:`、`https:`、`mailto:` 或 `tel:` 开头的路径会被识别为外链，并通过 `window.open` 打开，不注册为本地页面组件。

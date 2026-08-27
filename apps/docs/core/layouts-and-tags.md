# 布局、菜单与 TagsView

四种桌面布局共享同一份动态路由。切换布局只改变路由在界面上的组织方式，不改变访问地址、权限和页面组件。

## 布局模式

| Store 值  | 界面名称   | 适用场景                                   |
| --------- | ---------- | ------------------------------------------ |
| `sidebar` | 经典侧边栏 | 菜单层级清晰、后台系统最常见的场景         |
| `top`     | 顶部导航   | 一级栏目少、希望获得更宽内容区域           |
| `mixed`   | 混合导航   | 顶部展示一级栏目，左侧展示当前栏目的子菜单 |
| `dual`    | 双列侧边栏 | 一级模块多，强调模块与具体菜单的分离       |

布局状态由 App Store 持久化到 `vea-app-v2`。布局切换器只调用 `setLayout()`，Layout 组件根据状态组合 `PrimaryNav`、`Menu`、`ToolHeader` 和内容区。

## 路由如何驱动菜单

Permission Store 的 `routers` 是唯一菜单数据源：

```ts
const visibleRoutes = computed(() => permissionStore.routers.filter((route) => !route.meta?.hidden))
```

- 经典侧边栏直接渲染全部可见路由。
- 顶部导航使用横向 Menu。
- 混合导航和双列侧边栏先确定当前一级路由，再把它的 children 转成绝对路径交给纵向 Menu。
- 面包屑和 TagsView 继续读取当前 Router 匹配结果，因此不会因布局变化而失去上下文。

## 移动端

窗口宽度小于 `768px` 时：

- `mobile` 自动变为 `true`。
- 所有桌面布局统一降级为经典侧边栏。
- 侧边栏以抽屉形式覆盖内容区。
- 点击遮罩关闭菜单。
- 桌面布局偏好仍然保留，回到大屏后恢复。

移动端行为由 `ConfigGlobal` 统一监听窗口宽度，业务页面不需要单独判断布局模式。

## TagsView 数据

TagsView Store 维护两组数据：

| 字段           | 说明                                          |
| -------------- | --------------------------------------------- |
| `visitedViews` | 当前打开的标签，保存路由路径、查询参数和 meta |
| `cachedViews`  | 需要被 KeepAlive 缓存的路由组件名             |

访问路由时，TagsView 会按 `path` 新增或更新标签；查询参数变化会更新已有标签信息，不重复创建同一路径的标签。

## 路由 meta 与标签

```ts
meta: {
  title: 'router.dashboard',
  icon: 'mdi:view-dashboard',
  affix: true,
  noCache: true,
  noTagsView: false
}
```

- `affix`：页面启动后即加入标签，且不能关闭。
- `noCache`：页面不进入 KeepAlive。
- `noTagsView`：页面不创建标签。
- `icon`：标签优先使用当前路由或最近父路由的图标。

## 页面缓存

内容区使用：

```vue
<keep-alive :include="cachedViews">
  <component :is="Component" :key="route.fullPath" />
</keep-alive>
```

KeepAlive 的 `include` 按组件名匹配。因此需要缓存的页面必须有稳定的组件名，并与路由 `name` 保持一致：

```vue
<script setup lang="ts">
  defineOptions({ name: 'UserList' })
</script>
```

```json
{
  "name": "UserList",
  "component": "views/User/List",
  "meta": { "noCache": false }
}
```

## 刷新标签

刷新不是执行整个浏览器刷新，而是：

1. 暂时从 `cachedViews` 删除当前组件名。
2. 跳转到 `/redirect<当前路径>`。
3. Redirect 页面使用 `replace` 返回原地址。
4. 当前页面组件重新创建。

这样可以保留应用状态和其他标签，同时重新执行当前页面的生命周期。

## 关闭策略

TagsView 支持：

- 关闭当前标签。
- 关闭左侧、右侧或其他标签。
- 关闭全部可关闭标签。
- 固定标签始终保留。
- 关闭当前激活标签后，优先进入右侧相邻标签，其次进入左侧或默认业务路由。

Store 在每次增删后通过 `syncCachedViews()` 重新生成缓存名单，避免标签状态和 KeepAlive 状态分叉。

## 是否需要持久化 TagsView

当前不持久化。动态路由会在刷新时重新请求，标签中还包含不可序列化或可能失效的路由信息。若业务确实需要恢复标签，建议只保存 `fullPath` 列表，并在动态路由注册完成后逐个校验再恢复。

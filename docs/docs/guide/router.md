# 路由配置和侧边栏

路由和侧边栏是组织起一个后台应用的关键骨架。

本项目侧边栏和路由是绑定在一起的，所以你只有在`src/router/index.ts`下面配置对应的路由，侧边栏就能动态的生成了。大大减轻了手动重复编辑侧边栏的工作量。当然这样就需要在配置路由的时候遵循一些约定的规则。

## 配置项

首先我们了解一下本项目配置路由时提供了哪些配置项。

```javaScript
{
  redirect: 'noredirect',     // 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  name:'router-name'   ,      // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  meta : {
    hidden: true ,            // 当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
    alwaysShow: true,         // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
                              // 只有一个时，会将那个子路由当做根路由显示在侧边栏，
                              // 若你想不管路由下面的 children 声明的个数都显示你的根路由，
                              // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
                              // 一直显示根路由(默认 false)
    title: 'title',           // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name',         // 设置该路由的图标
    noCache: true,            // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false,        // 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true,              // 如果设置为true，则会一直固定在tag项中(默认 false)
    noTagsView: true,         // 如果设置为true，则不会出现在tag中(默认 false)
    activeMenu: '/dashboard', // 显示高亮的路由路径
    followAuth: '/dashboard', // 跟随哪个路由进行权限过滤
    showMainRoute: true,      // 设置为true即使hidden为true，也依然可以进行路由跳转(默认 false)
    followRoute: '/dashboard',// 为路由设置跟随其他路由的权限
  }
}
```

## 路由

这里的路由分为两种，`constantRoutes` 和 `asyncRoutes`。

`constantRoutes`： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。

`asyncRoutes`： 代表那些需求动态判断权限并通过 `addRoutes` 动态添加的页面。

## 侧边栏

本项目侧边栏主要基于 `element-plus` 的 `el-menu` 改造。

侧边栏是通过读取路由并结合权限判断而动态生成的，而且还需要支持路由无限嵌套，所以这里还使用到了递归组件。

具体代码可查看`src/layout/components/Sider/index.vue`

## 多级目录(嵌套路由)

如果你的路由是多级目录，如本项目 `src/views/level` 那样，有三级路由嵌套的情况下，不要忘记还要手动在二级目录的根文件下添加一个 `<router-view />`。

## 路由缓存

::: tip 提示
本项目中路由都是默认缓存的，这里涉及到了嵌套路由的缓存问题。为了保证多级路由缓存可以正常使用，本项目中在动态路由中，把二级以下的路由全部转换成二级路由，菜单栏还是遵循开发者的嵌套结构来渲染。

具体过滤代码可以查看`src/store/modules/permission.ts`
:::

## 面包屑

::: tip 提示
本项目中也封装了一个面包屑导航，它也是通过 `watch $route` 变化动态生成的。它和 `menu` 也一样，也可以通过之前那些配置项控制一些路由在面包屑中的展现。大家也可以结合自己的业务需求增改这些自定义属性。比如可以在路由中声明`breadcrumb:false`，让其不在 `breadcrumb` 面包屑显示。

具体代码可以查看`src/layout/components/Breadcrumb/index.vue`
:::

## 标签页

::: tip 提示
本项目中每进行一次路由跳转，都会相应的把跳转的路由进行存储，进而在 `标签页` 中展示，让开发者可以快速的进行路由历史记录的操作。如果不需要，可以在路由配置中设置`noTagsView: true`即可隐藏。

组件具体代码可查看`src/layout/components/TagsView/index.vue`

标签页过滤代码可查看`src/store/modules/tags-view.ts`
:::

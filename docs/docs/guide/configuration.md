# 项目配置

## 环境变量配置

在项目中，难免会碰到需要在不同环境下做不同的事，这时候，就需要自己去配置环境变量。目前`vue-element-plus-admin`提供了四种环境变量。除了`.env.base`是针对开发的时候，其他三种环境变量是针对打包的时候去构建不同环境的。目前主要的一个区别就是为了区分出接口前缀。

开发人员可以根据实际项目情况去进行扩展改造。

环境变量文件都存放更目录下的`.env.xx`文件中。

::: tip 提示
获取全局环境变量：import.meta.env
:::

### .env.base

当运行`npm run dev`的时候，默认取的是`.env.base`中的环境变量以及参数。

```javascript
// 环境
NODE_ENV=development
// 接口环境
VITE_API_BASEPATH='base'
```

### .env.dev

当运行`npm run build:dev`的时候，默认取的是`.env.dev`中的环境变量以及参数，打包开发环境的项目代码，适用于开发人员的自我测试。

```javascript
// 环境
NODE_ENV=production
// 接口环境
VITE_API_BASEPATH='dev'
```

### .env.test

当运行`npm run build:test`的时候，默认取的是`.env.test`中的环境变量以及参数，打包测试环境的项目代码，适用于测试人员进行项目测试。

```javascript
// 环境
NODE_ENV=production
// 接口环境
VITE_API_BASEPATH='test'
```

### .env.pro

当运行`npm run build:pro`的时候，默认取的是`.env.pro`中的环境变量以及参数，打包生产环境的项目代码，用于上线交付。

```javascript
// 环境
NODE_ENV=production
// 接口环境
VITE_API_BASEPATH='pro'
```

## 主题色和样式配置

主要用于配置侧边栏菜单和顶部菜单的主题色以及`layout`整体布局

侧边栏菜单和顶部菜单的样式主要代码位置位于`src/styles/sidebar.less`

目前`vue-element-plus-admin`的布局和主题采用的是`css变量`，如果需要更，可在`src/styles/var.less`中进行更改，更改后将影响整个项目的主题和布局。

::: tip 提示
目前并没有开放主题更改，只能手动在代码上进行变更，后续也会针对这个需求去进行主题的改造。
:::

```css
:root {
  --main-color: #018ffb; // 主颜色

  // Silder
  --menu-text-color: #bfcbd9; // 左侧菜单字体颜色
  --menu-active-text-color: #fff; // 左侧菜单选中字体颜色
  --menu-active-background-color: #2d8cf0; // 左侧菜单选中背景颜色
  --menu-background-color: #001529; // 左侧菜单背景颜色
  --sub-menu-background-color: #1f2d3d; // 左侧子菜单背景颜色
  --sub-menu-hover-color: #2d8cf0; // 左侧子菜单悬停字体颜色
  --sub-menu-active-text-color: #fff; // 左侧子菜单选中字体颜色
  --menu-width: 200px; // 左侧菜单宽度
  --menu-min-width: 64px; // 左侧菜单最小宽度

  // topSider
  --top-sider-height: 60px; // 顶部菜单高度，最低60px，element的最小高度。
  --top-menu-text-color: #303133; // 顶部菜单字体颜色
  --top-menu-active-text-color: #2d8cf0; // 顶部菜单选中字体颜色
  --top-menu-active-background-color: #fff; // 顶部菜单选中背景颜色
  --top-menu-background-color: #fff; // 顶部菜单背景颜色
  --top-sub-menu-background-color: #1f2d3d; // 顶部子菜单背景颜色
  --top-sub-menu-hover-color: #2d8cf0; // 顶部子菜单悬停字体颜色
  --top-sub-menu-active-text-color: #2d8cf0; // 顶部子菜单选中字体颜色

  // meunTab
  --menu-tab-width: 90px; // 菜单tab宽度
  --menu-tab-item-height: 70px; // 菜单子tab高度
  --menu-tab-background-color: #fff; // 菜单tab背景颜色
  --menu-tab-text-color: #000; // 菜单tab字体颜色
  --menu-tab-active-background-color: #2d8cf0; // 菜单tab选中背景颜色
  --menu-tab-active-text-color: #fff; // 菜单tab选中字体颜色

  // menuTopTab
  --menu-top-tab-width: 120px; // 顶部菜单tab宽度
  --menu-top-tab-background-color: #fff; // 顶部菜单tab背景颜色
  --menu-top-tab-text-color: #000; // 顶部菜单tab字体颜色
  --menu-top-tab-active-background-color: #2d8cf0; // 顶部菜单选中背景颜色
  --menu-top-tab-active-text-color: #fff; // 顶部菜单选中字体颜色

  // navbar
  --navbar-height: 40px; // navbar高度

  // tagsView
  --tags-view-height: 40px; // 标签页高度
  --tag-background-color: #fbfbfb; // 标签页背景颜色
  --tag-active-background-color: #fff; // 标签页选中背景颜色

  // content
  --content-background-color: #fff; // 展示区域背景颜色
  --app-background-color: #f5f7f9; // 整体背景颜色

  // html body
  --content-min-width: 992px; // 项目最小宽度
}
```

## 项目配置

::: tip 提示
项目配置用于配置项目内展示的内容/布局/文本等效果，存于 `pinia` 中。

文件位置`src/store/modules/app.ts`，更改保存之后将会立即作用于整个项目中，开发者可根据实际项目进行扩展。
:::

```javaScript
collapsed: false, // 菜单栏是否栏缩收
showLogo: true, // 是否显示logo
showTags: true, // 是否显示标签栏
showNavbar: true, // 是否显示navbar
fixedHeader: true, // 是否固定header
layout: 'Classic', // layout布局
showBreadcrumb: true, // 是否显示面包屑
showHamburger: true, // 是否显示侧边栏缩收按钮
showScreenfull: true, // 是否全屏按钮
showUserInfo: true, // 是否显示用户头像
title: 'vue-element-plus-admin', // 标题
logoTitle: 'vue-ElPlus-admin', // logo标题
userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
greyMode: false, // 是否开始灰色模式，用于特殊悼念日
showBackTop: true, // 是否显示回到顶部
showMenuTab: false, // 是否固定一级菜单
requestTime: false // 是否在接口调用时添加时间戳，避免IE缓存
```

<div align="center"> <a href="https://github.com/kailong321200875/vue-element-plus-admin"> <img width="100" src="./public/logo.png"> </a> <br> <br>

[![license](https://img.shields.io/github/license/kailong321200875/vue-element-plus-admin.svg)](LICENSE) [![repo-size](https://img.shields.io/github/repo-size/kailong321200875/vue-element-plus-admin.svg)](repo-size) [![last-commit](https://img.shields.io/github/last-commit/kailong321200875/vue-element-plus-admin.svg)](last-commit) [![stars](https://img.shields.io/github/stars/kailong321200875/vue-element-plus-admin.svg)](stars) [![forks](https://img.shields.io/github/forks/kailong321200875/vue-element-plus-admin.svg)](forks) [![release](https://img.shields.io/github/release/kailong321200875/vue-element-plus-admin.svg)](release) [![watchers](https://img.shields.io/github/watchers/kailong321200875/vue-element-plus-admin.svg)](watchers)

<h1>vue-element-plus-admin</h1>
</div>

[English](./README.md) | **中文**

## 介绍

vue-element-plus-admin 是一个基于 `element-plus` 免费开源的中后台模版。使用了最新的`vue3`，`vite`，`TypeScript`等主流技术开发，开箱即用的中后台前端解决方案，可以用来作为项目的启动模版，也可用于学习参考。并且时刻关注着最新技术动向，尽可能的第一时间更新。

vue-element-plus-admin 的定位是后台集成方案，不太适合当基础模板来进行二次开发。因为集成了很多你可能用不到的功能，会造成不少的代码冗余。如果你的项目不关注这方面的问题，也可以直接基于它进行二次开发。

如需要基础模版，请切换到 `mini` 分支，`mini` 只简单集成了一些如：布局、动态菜单等常用布局功能，更适合开发者进行二次开发。

## 特性

- **最新技术栈**：使用 Vue3/vite4 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**: 可配置的主题
- **国际化**：内置完善的国际化方案
- **自定义数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件
- **示例** 内置丰富的示例

## 预览

- [vue-element-plus-admin](https://element-plus-admin.cn/) - 完整版 github 站点
- [vue-element-plus-admin](https://kailong110120130.gitee.io/vue-element-plus-admin) - 完整版 gitee 站点

帐号：**admin/admin**

在线例子默认不适用菜单过滤，而是直接使用静态路由表

## 文档

[文档地址 Github](https://element-plus-admin-doc.cn/)

[文档地址 Gitee](https://kailong110120130.gitee.io/vue-element-plus-admin-doc)

## 前序准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) - 项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉 `TypeScript` 基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Element-Plus](https://element-plus.org/) - element-plus 基本使用
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 安装和使用

- 获取代码

```bash
git clone https://github.com/kailong321200875/vue-element-plus-admin.git
```

- 安装依赖

```bash
cd vue-element-plus-admin

pnpm install

```

- 运行

```bash
pnpm run dev
```

- 打包

```bash
pnpm run build:pro
```

## 更新日志

[更新日志](./CHANGELOG.md)

## 如何贡献

<a href="https://github.com/kailong321200875/vue-element-plus-admin/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kailong321200875/vue-element-plus-admin" />
</a>

你可以[提一个 issue](https://github.com/kailong321200875/vue-element-plus-admin/issues/new) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- `feat` 新功能
- `fix` 修补 bug
- `docs` 文档
- `style` 格式、样式(不影响代码运行的变动)
- `refactor` 重构(即不是新增功能，也不是修改 BUG 的代码)
- `perf` 优化相关，比如提升性能、体验
- `test` 添加测试
- `build` 编译相关的修改，对项目构建或者依赖的改动
- `ci` 持续集成修改
- `chore` 构建过程或辅助工具的变动
- `revert` 回滚到上一个版本
- `workflow` 工作流改进
- `mod` 不确定分类的修改
- `wip` 开发中
- `types` 类型

## 浏览器支持

本地开发推荐使用 `Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Donate

如果你觉得这个项目有帮助，欢迎赞助以示支持~

[Paypal Me](https://www.paypal.com/paypalme/ckl94)

<img src="https://gitee.com/kailong110120130/my-image/raw/master/pay.jpg" />

## 交流群

如果你想进入技术交流群讨论，请扫码加入或者添加我为好友邀请入群

### 群二维码

<img src="https://gitee.com/kailong110120130/my-image/raw/master/WechatIMG435.jpg" />

### 我的二维码

<img src="https://gitee.com/kailong110120130/my-image/raw/master/me.jpg" />

## 许可证

[MIT](./LICENSE)

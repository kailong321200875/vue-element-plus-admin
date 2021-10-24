# vue-element-plus-admin

> 一套基于 vue3 & typeScript4 & vite2 的后台集成方案

## 介绍

vue-element-plus-admin 是一套基于 vue3 & typeScript4 & vite2 的后台集成方案，内置了动态路由，权限验证，典型的业务模型，丰富的功能组件，开箱即用，可以用来作为项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。

vue-element-plus-admin 的定位是后台集成方案，不太适合当基础模板来进行二次开发。因为集成了很多你可能用不到的功能，会造成不少的代码冗余。如果你的项目不关注这方面的问题，也可以直接基于它进行二次开发。

[在线预览地址](http://8.133.179.48:4000/dist-pro/#/login)

如需要基础模版，请切换到`tempalte`分支。

## 前序准备

你需要在本地安装[node](https://nodejs.org/en/)和[git](https://git-scm.com/)。本项目技术栈基于[ES2015+](https://es6.ruanyifeng.com/)、[typescript](https://www.typescriptlang.org/)、[vue](https://cn.vuejs.org/index.html)、[pinia](https://pinia.esm.dev/)、[vue-router](https://router.vuejs.org/zh/)、[axios](https://github.com/axios/axios)和[element-plus](https://github.com/element-plus/element-plus)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 目录结构

```sh
.
├── public # 静态资源
├── src # 项目代码
│   ├── assets # 静态资源
│   ├── axios-config # axios配置
│   ├── components # 公用组件
│   ├── directive # 自定义指令
│   ├── hooks # 常用hooks
│   ├── layout # 布局组件
│   ├── plugins # 外部插件
│   ├── mock # 模拟数据
│   ├── router # 路由配置
│   ├── store # 状态管理
│   ├── styles # 全局样式
│   ├── utils # 全局工具类
│   ├── views # 路由页面
│   ├── vue-bus # 跨组件通信
│   ├── App.vue # 入口vue文件
│   ├── env.d.ts # vue全局声明
│   ├── global.d.ts # 业务代码全局声明
│   ├── main.ts # 主入口文件
│   └── permission.ts # 路由拦截
├── .babelrc # babel配置
├── .editorconfig # 编辑器配置
├── .eslintignore # eslint 忽略配置项
├── .eslintrc # eslint 配置文件
├── .gitignore # git 忽略提交配置文件
├── .postcssrc.js # postcss 配置文件
├── .prettierrc.js # 代码格式 配置文件
├── .stylelintignore # stylelint 忽略文件
├── CHANGLOG.md # 更新日志
├── commitlint.config.js # git commit 配置文件
├── package.json
├── README.md
├── stylelint.config # stylelint配置文件
├── tsconfig.json # ts 配置文件
├── vite.config.ts # vite配置
└── yarn.lock
```

## 浏览器支持

由于 Vue 3 不再支持 IE11，vue-element-plus-admin 也不支持 IE

| [<img src="https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge ≥ 79 | Firefox ≥ 78 | Chrome ≥ 64 | Safari ≥ 12 |

## IDE 推荐设置

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

<div align="center"> <a href="https://github.com/kailong321200875/vue-element-plus-admin"> <img width="100" src="./public/logo.png"> </a> <br> <br>

[![license](https://img.shields.io/github/license/kailong321200875/vue-element-plus-admin.svg)](LICENSE)

<h1>vue-element-plus-admin</h1>
</div>

**English** | [中文](./README.zh-CN.md)

## Introduction

vue-element-plus-admin is a free and open source middle and background template based on `element-plus`. Developed using the latest mainstream technologies such as `vue3`, `vite4` and `typescript`, the out of the box middle and background front-end solution can be used as the starting template of the project and learning reference. And always pay attention to the latest technological trends and update them as soon as possible.

vue-element-plus-admin is positioned as a background integration scheme, which is not suitable for secondary development as a basic template. Because it integrates many functions that you may not use, it will cause a lot of code redundancy. If your project doesn't pay attention to this problem, you can also directly carry out secondary development based on it.

If you need a basic template, please switch to the `tempalte` branch. `Tempalte` simply integrates some common layout functions such as layout and dynamic menu, which is more suitable for developers to carry out secondary development.

## Feature

- **State of The Art Development**：Use front-end front-end technology development such as Vue3/vite4
- **TypeScript**: Application-level JavaScript language
- **Theming**: Configurable themes
- **International**：Built-in complete internationalization program
- **Mock Server** Built-in mock data scheme
- **Authority** Built-in complete dynamic routing permission generation scheme.
- **Component** Multiple commonly used components are encapsulated twice
- **Examples** Built-in rich examples

## Preview

- [vue-element-plus-admin](https://element-plus-admin.cn/) - Full version of the github site
- [vue-element-plus-admin](https://kailong110120130.gitee.io/vue-element-plus-admin) - Full version of the gitee site

account: **admin/admin test/test**

`admin` account is used to simulate the control permission of the server, and render whatever the server returns

`test` account is used to simulate the front-end control authority. The server only returns the menu key to be displayed, and the front-end performs matching rendering

## Documentation

[Document Github](https://element-plus-admin-doc.cn/)

[Document Gitee](https://kailong110120130.gitee.io/vue-element-plus-admin-doc)

## Preparation

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite4](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6+](http://es6.ruanyifeng.com/) - Familiar with es6 basic syntax
- [Vue-Router-Next](https://next.router.vuejs.org/) - Familiar with the basic use of vue-router
- [Element-Plus](https://element-plus.org/) - Familiar with the basic use of element-plus
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs basic syntax

## Install and use

- Get the project code

```bash
git clone https://github.com/kailong321200875/vue-element-plus-admin.git
```

- Installation dependencies

```bash
cd vue-element-plus-admin

pnpm install

```

- run

```bash
pnpm run dev
```

- build

```bash
pnpm run build:pro
```

## Change Log

[CHANGELOG](./CHANGELOG.md)

## How to contribute

You can [Raise an issue](https://github.com/kailong321200875/vue-element-plus-admin/issues/new) Or submit a Pull Request.

**Pull Request:**

1. Fork code
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. submit `pull request`

## Git Contribution submission specification

- `feat` New features
- `fix` Fix bugs
- `docs` document
- `style` Format and style (changes that do not affect code operation)
- `refactor` Refactor
- `perf` Optimize related, such as improving performance and experience
- `test` Add test
- `build` Compilation related modifications, changes to project construction or dependencies
- `ci` Continuous integration modification
- `chore` Changes in the construction process or auxiliary tools
- `revert` Rollback to previous version
- `workflow` Workflow improvement
- `mod` Uncertain modification classification
- `wip` Under development
- `types` type

## Browser support

The `Chrome 80+` browser is recommended for local development

Support modern browsers, not IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## License

[MIT](./LICENSE)

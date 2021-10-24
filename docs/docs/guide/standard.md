# 项目规范

## ESlint

### 介绍

::: tip
使用 lint 的好处不管是多人合作还是个人项目，具备基本工程素养的同学都会注重编码规范，而代码风格检查（Code Linting，简称 Lint）是保障代码规范一致性的重要手段。

遵循相应的代码规范有以下好处

- 较少 bug 错误率
- 高效的开发效率
- 更高的可读性
:::

### 配置项

所有的配置文件都在`.eslintrc.js`中。 本项目基本规范是依托于 `vue` 官方的 `eslint` 规则 [eslint-config-vue](https://github.com/vuejs/eslint-config-vue) 做了少许的修改。大家可以按照自己的需求进行定制化配置。

比如：我个人或者项目组习惯于使用两个空格，但你可能觉得四个空格更顺眼，你可以做如下修改。 进入项目 `.eslintrc.js` 中，找到 `indent`，然后修改为 `4` 即可。 还有各种各样的配置信息，详情见 [ESLint](https://eslint.org/docs/rules/) 文档。

默认情况下使用了最严格的`plugin:vue/recommended`来校验代码，若你觉得太严格可自行修改。

```javaScript
eslintrc.js

module.exports = {
  extends: ['plugin:vue/recommended', 'eslint:recommended']
  //你可以修改为  extends: ['plugin:vue/essential', 'eslint:recommended']
}
```

### 自动修复

运行如下命令，`eslint` 会自动修复一些简单的错误。

```sh
npm run lint
```

## CommitLint

### 介绍

在一个团队中，每个人的`git`的`commit`信息都不一样，五花八门，没有一个机制很难保证规范化，如何才能规范化呢？可能你想到的是`git`的`hook`机制，去写`shell`脚本去实现。这当然可以，其实`JavaScript`有一个很好的工具可以实现这个模板，它就是`commitlint`（用于校验 git 提交信息规范）。

### 配置项

commit-lint 的配置位于项目根目录下`commitlint.config.js`

### 提交规范

- feat 新功能(feature)
- fix 修补 bug
- docs 文档(documentation)
- style 格式、样式(不影响代码运行的变动)
- refactor 重构(即不是新增功能，也不是修改 BUG 的代码)
- perf 优化相关，比如提升性能、体验
- test 添加测试
- build 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
- ci 持续集成修改
- chore 构建过程或辅助工具的变动
- revert 回滚到上一个版本
- workflow 工作流改进
- mod 不确定分类的修改
- wip 开发中
- types 类型修改
- release 版本发布

### 如何关闭

在`.husky/commit-msg`内注释以下代码即可

```sh
# npx --no-install commitlint --edit "$1"
```

### 提交示例

```sh
git commit -m 'feat(home): add home page'
```

## Stylelint

### 介绍

`stylelint`用于校验项目内部 css 的风格，加上编辑器的自动修复，可以很好的统一项目内部 css 风格

### 配置

`stylelint` 配置位于根目录下 stylelint.config.js

### 编辑器配合

如果您使用的是 `vscode` 编辑器的话，只需要安装[StyleLint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)插件，即可在保存的时候自动格式化文件内部 css 样式。

## Prettier

### 介绍

`prettier`可以用于统一项目代码风格，统一的缩进，单双引号，尾逗号等等风格。

### 配置

`prettier` 配置文件位于项目根目录下 prettier.config.js

### 编辑器配合

如果您使用的是 `vscode` 编辑器的话，只需要安装[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)插件，即可在保存的时候自动格式化文件内部 `js | ts` 格式。

## Git Hooks

很多时候我们 lint 的校验是放在持续集成阶段，大概流程如下：

::: tip
流程代码提交 --> 跑 CI 发现问题(远程) --> 本地修复问题 --> 重新提交 --> 通过检查(远程)
:::

但这样有一个问题，我们的 `CI(持续集成)` 往往不是仅仅只做 `Lint`工作，它还有会有很多其它的任务（如打包文件，静态资源上传 `CDN` 等），这样就导致特别的浪费时间，往往可能需要几分钟之后你才会发现问题，或者有的时候你根本就没有发现你的 `CI` 没有跑通过。

常见的流程：本地写好了代码，提交，开始跑 `lint`，发现不通过，本地修改代码，再提交，再等待 `CI` 的结果，若还有问题再重复之前的操作。

### husky

最有效的解决方案就是将 `Lint` 校验放到本地，常见做法是使用 [husky](https://github.com/typicode/husky) 或者 [pre-commit](https://github.com/observing/pre-commit) 在本地提交之前先做一次 `Lint`校验。

最后尝试 Git 提交，你就会很快收到反馈：

```sh
git commit -m "Keep calm and commit"
```

但这样会有一个问题，就是这次提交，我可能只修改了一个文件，比如我就修改了 `foo.js` 的内容，但它依然会校验所有`src` 下面的`.js`文件，非常的不友好。导致的问题就是：每次我提交我写的代码，还先要帮人的代码问题解决了才能顺利提交，而且当项目大了之后，检查速度也会变得越来越慢了。

### lint-staged

解决上面的痛点就需要使用 [lint-staged](https://github.com/okonet/lint-staged) 了。它只会校验检查你提交或者说你修改的部分内容。

如上配置，每次它只会在你本地 `commit` 之前，校验你提交的内容是否符合你本地配置的 `eslint`规则，如果符合规则，则会提交成功。如果不符合它会自动执行 `eslint --fix` 尝试帮你自动修复，如果修复成功则会帮你把修复好的代码提交，如果失败，则会提示你错误，让你修好这个错误之后才能允许你提交代码。

### 总结

最佳的 `lint` 规范流程就是推荐团队成员先在自己的编辑器中配置 `eslint`，这样平时写的时候编辑器就能帮你修正一些简单的格式错误，同时提醒你有哪些不符合 `lint` 规范的的地方，并在命令行中提示你错误。。

但这并不是强制的，有些团队成员或者说刚来的实习生没有在编辑器中配置或者无视命令行中提示的错误，这时候就需要配置`pre-commit` 这种强制性校验的东西，保证所有提交到远程仓库的内容都是符合团队规范的。

# 代码规范

项目使用 Oxlint 做 JavaScript/TypeScript/Vue 静态检查，Prettier 统一格式，Stylelint 检查样式，vue-tsc 负责类型检查。

## 常用命令

```bash
pnpm lint               # 全仓 Oxlint
pnpm lint:fix           # Oxlint 自动修复
pnpm lint:style         # Stylelint 自动修复
pnpm typecheck:admin    # Admin 类型检查
```

包级测试：

```bash
pnpm --filter @vea/hooks test
pnpm --filter @vea/request test
```

这两组测试使用 `esno + node:assert`，当前没有 Vitest/Jest 测试运行器。

## Oxlint

规则位于根目录 `.oxlintrc.json`，启用 TypeScript 和 Vue 插件，并把 correctness 类问题作为 error。

Oxlint 替代了 ESLint，不要再新增 ESLint 配置与依赖。确实需要局部禁用规则时，使用 Oxlint 支持的 suppression 注释并解释原因。

## 格式化

`.prettierrc.json` 的主要约定：

- 2 空格缩进。
- 单引号。
- 不写分号。
- 行宽 100。
- Vue 的 script/style 内部缩进。

不要手工调整成与配置相反的格式；提交前的 lint-staged 会再次格式化暂存文件。

## 样式

Stylelint 覆盖 Vue、CSS、Less、SCSS 和 HTML，用于检查样式语法与常见问题。

主题色优先引用 `@vea/styles` 的 CSS variables。局部组件样式使用 scoped，只有真正跨应用的基础规则才进入 packages。

## Git Hooks

安装依赖后 Husky 注册 hooks。提交前会执行：

```text
pnpm typecheck:admin
pnpm lint:lint-staged
```

lint-staged 对暂存文件分别运行 Oxlint、Prettier 和 Stylelint。类型检查失败时，应该修正报错，不要用 `--no-verify` 把问题带入分支。

提交信息由 Commitlint 按 Conventional Commits 校验：

```text
feat: add user management
fix: resolve dynamic route refresh
docs: update deployment guide
refactor: simplify request client
```

当前允许的常见 type 包括 `feat`、`fix`、`docs`、`style`、`refactor`、`perf`、`test`、`ci`、`chore`、`revert` 和 `wip`。

## TypeScript 命名

- Vue 组件文件使用 PascalCase，例如 `LocaleDropdown.vue`。
- Hook 使用 `useXxx`，例如 `useCrud`。
- API 函数使用动词 + 领域 + `Api`，例如 `getRouteListApi`。
- 类型使用 PascalCase，不加 `I` 前缀，例如 `LoginParams`、`ApiResponse`。
- 布尔值使用 `is`、`has`、`can`、`should` 等可读前缀。
- 常量使用 UPPER_SNAKE_CASE，仅在值真的是全局常量时使用。

类型尽量靠近领域模块。Request 层只保留协议类型，不维护所有页面的业务模型。

## 导入与目录

- 应用内部使用 `@/` 指向 `apps/admin/src`。
- 公共能力从 `@vea/*` 包名导入，不跨目录引用 packages 源文件。
- 同一领域的 API 和类型放在相邻目录。
- Hooks 已扁平化在 `src/hooks`，不再增加只有一层内容的 `web/` 目录。
- 没有真实复用价值的 utils 不要提前抽取。

## 已知脚本注意事项

- `npm:check` 会直接更新依赖版本，不是只读检查。

CI 不应调用 `npm:check`。需要统一格式化整个 workspace 时使用 `pnpm lint:format`。

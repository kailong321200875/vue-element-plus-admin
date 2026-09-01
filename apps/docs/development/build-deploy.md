# 构建与部署

Admin 和文档站是两个独立应用，分别构建、分别发布。

## 构建 Admin

```bash
pnpm build:admin
```

默认使用 `pro` mode，产物位于：

```text
apps/admin/dist-pro
```

其他构建：

```bash
pnpm build:admin:dev   # apps/admin/dist-dev
pnpm build:admin:test  # apps/admin/dist-test
pnpm preview:admin     # 本地预览 pro 构建
```

构建前建议至少执行：

```bash
pnpm lint
pnpm format:check
pnpm style:check
pnpm typecheck
```

## 构建文档

```bash
pnpm build:docs
pnpm preview:docs
```

文档产物位于：

```text
apps/docs/.vitepress/dist
```

文档使用 VitePress 内置本地搜索，不依赖外部搜索服务。

文档配置当前默认部署在域名根路径。发布到 `/vue-element-plus-admin/` 等子目录时，需要在 `.vitepress/config.ts` 同步配置：

```ts
export default defineConfig({
  base: '/vue-element-plus-admin/'
})
```

修改后重新构建；文档的 VitePress `base` 与 Admin 的 `VITE_BASE_PATH` 是两套独立配置。

## 静态部署 Admin

Admin 使用 Hash History，业务地址形如：

```text
https://example.com/#/dashboard/analysis
```

Hash 不会发送给服务器，因此普通静态托管通常不需要为业务路由配置 history fallback。服务器只需要正确提供 `index.html` 和静态资源。

Nginx 最小示例：

```nginx
server {
  listen 80;
  server_name example.com;
  root /srv/element-admin;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://backend/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

虽然 Hash Router 不依赖 fallback，保留 `index.html` 回退可以兼容站点其他路径；如果服务器还有别的应用，应按实际路径缩小 location 范围。

## 部署到子目录

发布到 `https://example.com/admin/` 时设置：

```dotenv
VITE_BASE_PATH=/admin/
```

然后重新构建。采用站点绝对子路径时，Base 应以 `/` 开头和结尾，否则静态资源地址容易错误；Vite 也支持 `./` 或完整 CDN URL，应按部署方式选择。

API 建议使用同源前缀：

```dotenv
VITE_API_BASE_PATH=/api
```

由生产网关把 `/api` 转发到后端，前端无需保存真实服务地址，也避免浏览器跨域配置。

## 构建优化

当前配置包含：

- 页面通过动态 import 按路由拆分，第三方依赖交给 Vite/Rollup 自动分包。
- ECharts 按模块注册。
- 图标按 app 白名单静态导入。
- CSS split 与 sourcemap 由环境变量控制。

模板不维护固定的 `manualChunks` 映射，避免依赖版本与模块边界变化后产生巨型公共包或循环 chunk。构建体积异常时应结合构建产物和实际引用链路定位，不要仅凭依赖名称删除能力。

## Mock 与生产环境

当 `VITE_USE_MOCK=true` 时，生产构建会包含浏览器端 Mock，静态部署后无需后端即可使用登录、动态路由和首页示例，适合模板演示站。

实际业务部署应设置 `VITE_USE_MOCK=false`，并通过 `VITE_API_BASE_PATH` 和网关接入真实接口，避免把演示数据打入生产包。该环境变量会在构建时写入产物，修改后需要重新构建。

## 推荐部署架构

v3 采用“一个版本发布流程、两个 Cloudflare Pages 项目”的方式部署：

```text
功能 PR -> GitHub CI -> master
                        └─ Release Please 持续更新 Release PR（不部署）
                           └─ 手动合并 Release PR
                              └─ GitHub Release
                                 └─ GitHub Actions 构建当前提交
                                    ├─ Wrangler 上传 Admin -> element-plus-admin.cn
                                    └─ Wrangler 上传 Docs  -> docs.element-plus-admin.cn
```

GitHub Actions 在业务 PR 阶段执行安装、代码与样式规范、格式、类型检查、包测试和双应用构建校验。业务代码合入 `master` 后，Release Please 只创建或更新同一份 Release PR，不创建 Tag，也不部署站点。后续提交会继续累积到这份 PR，并根据 Conventional Commit 自动更新候选版本和 Changelog。只有手动合并 Release PR、创建 GitHub Release 后，GitHub Actions 才会在该发布提交上构建两个应用，通过 Wrangler 直接上传产物并检查部署地址。因此 `master` 可以持续接收小改动，而发布时机仍由 Release PR 控制。

仓库根目录的 `.node-version` 固定 Node.js `22.19.0`，`package.json` 固定 pnpm `9.15.3`。Cloudflare Pages Build System v3 不会从 `package.json` 自动读取包管理器版本，因此两个项目都要显式设置环境变量：

```text
PNPM_VERSION=9.15.3
```

## 创建 Cloudflare Pages 项目

在 Cloudflare 的 **Workers & Pages** 中选择 **Create application > Pages > Import an existing Git repository**，将同一个 GitHub 仓库导入两次，并使用以下配置：

| 配置项           | Admin                 | Docs                        |
| ---------------- | --------------------- | --------------------------- |
| 项目名           | `element-plus-admin`  | `element-plus-admin-docs`   |
| 生产分支         | `master`              | `master`                    |
| Framework preset | `None`                | `None`                      |
| Root directory   | 留空，使用仓库根目录  | 留空，使用仓库根目录        |
| Build command    | `pnpm build:admin`    | `pnpm build:docs`           |
| Output directory | `apps/admin/dist-pro` | `apps/docs/.vitepress/dist` |
| 环境变量         | `PNPM_VERSION=9.15.3` | `PNPM_VERSION=9.15.3`       |

不要把 Root directory 设置为 `apps/admin` 或 `apps/docs`。两个应用都依赖根目录 lockfile 和 workspace 配置，Admin 还依赖 `packages/*`。

首次构建成功后，在各项目的 **Custom domains** 中分别绑定：

- Admin：`element-plus-admin.cn`
- Docs：`docs.element-plus-admin.cn`

根域名 `element-plus-admin.cn` 要作为 Cloudflare Zone 管理并使用 Cloudflare nameserver。`docs` 子域在同一 Zone 中会由 Pages 自动创建 DNS 记录；如果 DNS 由其他服务商管理，则先在 Pages 中关联子域，再按提示添加指向 `<project>.pages.dev` 的 CNAME。

## 配置生产直传

两个 Pages 项目都进入 **Settings > Builds > Branch control**：

- 关闭 **Enable automatic production branch deployments**。
- 将 **Preview branch** 设置为 `None`。

在 Cloudflare 的 **Account API Tokens** 中创建 Custom Token，并授予 **Account > Cloudflare Pages > Edit** 权限。然后在 GitHub 仓库 **Settings > Secrets and variables > Actions** 中保存：

- `CLOUDFLARE_API_TOKEN`：上一步生成的 Token。
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID。

发布工作流会在 GitHub Runner 中安装依赖并同时完成两个构建，随后使用 `cloudflare/wrangler-action` 上传 `apps/admin/dist-pro` 和 `apps/docs/.vitepress/dist`。部署命令显式携带 `master`、当前提交 SHA 和 Pages 项目名，因此 Cloudflare 收到的产物与 GitHub Release 对应。Wrangler 返回部署地址后，工作流还会执行 HTTP 可用性检查；上传或检查失败都会让发布任务失败。

在 GitHub 仓库 **Settings > Actions > General > Workflow permissions** 中启用 **Allow GitHub Actions to create and approve pull requests**，否则 Release Please 无法创建 Release PR。

## GitHub Actions 校验

`.github/workflows/ci.yml` 在目标为 `master` 的 Pull Request 中自动执行，也支持手动运行：

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm format:check
pnpm style:check
pnpm typecheck
pnpm --filter @vea/hooks test
pnpm --filter @vea/request test
pnpm build:admin
pnpm build:docs
```

Release Please 使用仓库自带的 `GITHUB_TOKEN`，机器人创建或更新 Release PR 时不会递归触发 CI。Release PR 只包含版本号、Manifest 和 Changelog；如果 `master` 强制要求 `Verify workspace`，需要为 GitHub Actions 机器人配置规则例外，或在 Release PR 分支手动运行 CI。

## Changelog 与版本发布

`.github/workflows/release.yml` 使用 Release Please v4，并从以下文件读取配置：

- `release-please-config.json`：发布类型、Tag 和 Changelog 分组。
- `.release-please-manifest.json`：当前已发布版本。

当前发布基线记录在 `.release-please-manifest.json`。Release Please 会持续解析上一个版本之后合入 `master` 的提交：`fix` 升级补丁版本、`feat` 升级次版本、带 `!` 或 `BREAKING CHANGE` 的提交升级主版本。只有 Release PR 合并后 `release_created=true`，构建和 Wrangler 部署才会执行。

## 发布与回滚

业务 PR 合入 `master` 不会直接发布站点；合并自动生成的 Release PR 后才会同时发布 Admin 和 Docs。Cloudflare Pages 的每次部署都是独立版本，出现问题时可在项目的 Deployments 页面回滚到上一个成功版本。

## 发布检查清单

- 环境文件中的 Base、API 地址和标题正确。
- 动态路由接口在未登录和已登录状态都符合约定。
- 当前 app 使用的所有路由图标已注册。
- 直接刷新登录页、首页和多级菜单地址正常。
- 亮暗色、语言切换和四种布局正常。
- 桌面与 768px 以下移动端均完成验证。
- sourcemap 没有误发布到公开环境。

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
pnpm typecheck:admin
pnpm lint
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

生产构建不会注册 Mock Server。部署前必须提供真实的登录、动态路由和首页接口，否则应用无法完成启动。

## CI 注意事项

仓库现有 `.github/workflows` 仍是旧版配置，存在以下不一致：

- 使用 Node 18，不满足当前 engine。
- 调用已经不存在的根脚本 `build:pro`。
- 发布根目录 `dist-pro`，而实际产物位于 `apps/admin/dist-pro`。

在修正前不要直接复用。新的流水线至少应使用当前 Node engine、pnpm 9，并执行：

```bash
pnpm install --frozen-lockfile
pnpm typecheck:admin
pnpm lint
pnpm build:admin
pnpm build:docs
```

Admin 和 docs 应分别上传各自的产物目录。

## 发布检查清单

- 环境文件中的 Base、API 地址和标题正确。
- 动态路由接口在未登录和已登录状态都符合约定。
- 当前 app 使用的所有路由图标已注册。
- 直接刷新登录页、首页和多级菜单地址正常。
- 亮暗色、语言切换和四种布局正常。
- 桌面与 768px 以下移动端均完成验证。
- sourcemap 没有误发布到公开环境。

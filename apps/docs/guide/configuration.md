# 配置与环境变量

## 配置分层

项目配置分为三层：

| 层级     | 文件                                  | 用途                                   |
| -------- | ------------------------------------- | -------------------------------------- |
| 构建环境 | `apps/admin/.env.*`                   | 接口地址、部署路径、构建产物           |
| 应用开关 | `apps/admin/src/config/app.ts`        | 面包屑、TagsView、主题、页脚等 UI 能力 |
| 运行状态 | `apps/admin/src/store/modules/app.ts` | 当前布局、折叠、主题、移动端状态       |

构建期常量放环境变量；不随环境变化的产品开关放 `appConfig`；用户在运行期可以切换的状态放 Store。

## 构建模式

| 模式 | 文件        | 输出目录    | Base          |
| ---- | ----------- | ----------- | ------------- |
| 本地 | `.env.base` | 开发服务器  | `/`           |
| 开发 | `.env.dev`  | `dist-dev`  | `/dist-dev/`  |
| 测试 | `.env.test` | `dist-test` | `/dist-test/` |
| 生产 | `.env.pro`  | `dist-pro`  | `/`           |

环境文件位于 `apps/admin`，因为 Vite 的工作目录就是该应用，而不是仓库根目录。

## 环境变量

| 变量                 | 说明                     |
| -------------------- | ------------------------ |
| `VITE_API_BASE_PATH` | Axios `baseURL`          |
| `VITE_BASE_PATH`     | Vite 公共基础路径        |
| `VITE_APP_TITLE`     | 页面标题与应用标题       |
| `VITE_SOURCEMAP`     | 是否输出 sourcemap       |
| `VITE_OUT_DIR`       | 构建输出目录             |
| `VITE_USE_MOCK`      | 是否启用开发期 Mock 插件 |
| `VITE_USE_CSS_SPLIT` | 是否拆分 CSS             |

只有 `VITE_` 开头的变量会暴露给浏览器端。新增变量后，同时更新 `apps/admin/types/env.d.ts`：

```ts
interface ImportMetaEnv {
  readonly VITE_EXAMPLE: string
}
```

环境变量读取结果都是字符串。布尔配置统一通过 `value === 'true'` 转换，不要依赖字符串真值。

## 应用 UI 配置

`src/config/app.ts` 维护不会被用户修改的能力开关。当前真正接入布局的字段如下：

```ts
export const appConfig = {
  title: import.meta.env.VITE_APP_TITLE,
  ui: {
    breadcrumb: true,
    breadcrumbIcon: true,
    hamburger: true,
    theme: true,
    locale: true,
    tagsViewIcon: true,
    footer: true,
    uniqueOpened: false
  }
} as const
```

`uniqueOpened` 为 `true` 时，纵向菜单同一时刻只展开一个一级分支。

## 运行状态

App Store 保存：

- `layout`：`sidebar | top | mixed | dual`
- `collapse`：侧边栏是否折叠
- `isDark`：是否使用深色主题
- `mobile`：当前是否小于 768px
- `pageLoading`：路由切换加载状态

其中 `layout`、`collapse`、`isDark` 会持久化到 `vea-app-v2`；`mobile` 与 `pageLoading` 只属于当前会话。

## API 代理

开发服务器默认将 `/api` 代理到 `http://127.0.0.1:8000`：

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

真实项目通常把 `VITE_API_BASE_PATH` 设置为 `/api`，由开发代理解决跨域，生产环境再由网关转发。

## 修改部署子路径

部署到 `https://example.com/admin/` 时：

```dotenv
VITE_BASE_PATH=/admin/
```

当前 Router 使用 Hash History，静态服务器不需要为每个业务路径配置 HTML 回退，但必须确保静态资源能从该 Base 路径访问。

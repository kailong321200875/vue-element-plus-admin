# 图标注册

图标采用“公共渲染器 + 各应用静态注册”的离线方案：

```text
@vea/components/Icon     只负责渲染
          ↑
apps/admin/src/icons.ts  只导入 Admin 实际使用的图标
```

这样新增第二个 app 时，不会因为共享 Icon 组件而打包 Admin 的全部图标。

## 注册一个图标

在应用自己的 `src/icons.ts` 静态导入：

```ts
import account from '@iconify-icons/mdi/account'
import type { IconRegistry } from '@vea/components'

export const icons = {
  'mdi:account': account
} satisfies IconRegistry
```

Admin 启动时调用：

```ts
import { Icon, registerIcons } from '@vea/components'
import { icons } from '@/icons'

registerIcons(icons)
app.component('Icon', Icon)
```

然后在任意模板中使用：

```vue
<Icon icon="mdi:account" :size="20" />
```

`size` 同时控制宽高，`color` 可选；默认颜色继承当前文本色。

## 动态路由图标

服务端路由只传图标名称，不传图标数据：

```json
{
  "path": "dashboard",
  "meta": {
    "title": "router.dashboard",
    "icon": "mdi:view-dashboard"
  }
}
```

因此该名称必须已存在于当前 app 的 `icons` 注册表。否则菜单仍能渲染文字，但图标为空。

建议让前后端共享一份允许使用的图标名称清单，避免接口返回任意字符串。

## 公共组件的图标依赖

公共组件不再隐式导入图标。例如 `LocaleDropdown` 使用 `mdi:translate`，消费它的 app 必须在自己的注册表中加入这个图标。这样依赖是显式的，也不会让不用语言切换的应用承担资源成本。

## 打包行为

项目使用 `@iconify/vue/offline`，并从 `@iconify-icons/mdi/<name>` 逐个静态导入数据：

- 构建时图标数据会进入应用产物。
- 运行时不访问 Iconify CDN。
- 未导入的图标不会进入该 app 的依赖图。
- 每个 app 可以拥有独立白名单。

不要改成运行时拼接模块路径或在线 API。动态字符串无法被构建工具可靠分析，也会失去离线可用性。

## 命名建议

- 注册 key 保持 Iconify 完整名称，如 `mdi:file-tree`。
- 变量名使用 camelCase，如 `fileTree`。
- 路由、组件和文档统一引用注册 key，不再维护第二套别名。
- 删除页面后，用 `rg` 搜索图标名称，确认无引用再从 `icons.ts` 移除。

## 排查图标不显示

依次检查：

1. 图标数据是否在当前 app 的 `icons.ts` 静态导入。
2. 注册 key 与模板或路由 `meta.icon` 是否完全一致。
3. `registerIcons()` 是否在应用挂载前执行。
4. 容器是否用 padding 或 flex shrink 压缩了图标。
5. 颜色是否与背景相同，或被局部 CSS 覆盖。

菜单图标尺寸应由菜单布局控制，Icon 本身只提供明确的宽高，避免公共组件根据使用场景猜测间距。

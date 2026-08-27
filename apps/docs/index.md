---
layout: home
titleTemplate: false

hero:
  name: ElementAdmin v3
  text: 把后台模板还给业务
  tagline: 基于 Vue 3、Element Plus 与 TypeScript 的轻量管理后台。动态路由、多布局和通用能力各守边界，业务按需加入。
  actions:
    - theme: brand
      text: 5 分钟开始
      link: /guide/getting-started
    - theme: alt
      text: 了解架构
      link: /guide/architecture

features:
  - title: 动态路由是唯一入口
    details: 登录后从接口获取路由，统一生成菜单、页面、面包屑与标签页，不维护第二份业务路由表。
  - title: 四种布局，同一份路由
    details: 经典侧边栏、顶部导航、混合导航和双列侧边栏共享路由数据，并自动降级为移动端侧边栏。
  - title: Packages 面向多应用
    details: Request、CRUD、表单、图标渲染和基础 UI 能力独立于 Admin，避免把业务状态带进共享层。
  - title: 图标默认离线
    details: 共享组件只负责渲染，具体图标由应用白名单注册，每个 App 只打包自己使用的图标数据。
  - title: 国际化即时生效
    details: Vue I18n、Element Plus locale、HTML lang 与持久化状态保持同步，切换语言无需刷新页面。
  - title: 少而清晰的抽象
    details: 不提供展示型组件大全。表格、弹窗和详情页留给业务，模板只维护跨项目真正稳定的能力。
---

<section class="runtime-flow" aria-labelledby="runtime-flow-title">
  <p class="runtime-flow__eyebrow">DYNAMIC ROUTE PIPELINE</p>
  <h2 id="runtime-flow-title">一条运行链路，驱动整个后台</h2>
  <div class="runtime-flow__track">
    <article>
      <span>01</span>
      <strong>接口路由</strong>
      <small>服务端返回路径、组件和 meta</small>
    </article>
    <article>
      <span>02</span>
      <strong>权限 Store</strong>
      <small>转换组件并保存可见路由</small>
    </article>
    <article>
      <span>03</span>
      <strong>Vue Router</strong>
      <small>登录态内动态注册与重置</small>
    </article>
    <article>
      <span>04</span>
      <strong>布局系统</strong>
      <small>菜单、面包屑与 TagsView 同步</small>
    </article>
  </div>
</section>

## v3 的边界

这不是旧版文档的搬运。v3 删除了大而全的组件案例、前端路由过滤和不必要的工具封装，文档也只描述仓库中真实存在的能力。

| 模板负责                     | 业务负责                 |
| ---------------------------- | ------------------------ |
| 登录会话、动态路由、权限恢复 | 具体角色与权限模型       |
| 四种布局、菜单和 TagsView    | 页面信息架构与业务导航   |
| 通用 Request、CRUD、表单状态 | 领域接口、字段和交互流程 |
| 图标渲染与注册机制           | 每个应用使用的图标白名单 |
| 主题与国际化基础设施         | 品牌视觉和业务文案       |

::: tip 阅读建议

第一次接入请依次阅读[快速开始](/guide/getting-started)、[目录与架构](/guide/architecture)和[动态路由与权限](/core/dynamic-routing)。

:::

# 介绍

为了更好演示，`vue-element-plus-admin`对`element-ui`的所有组件进行了全局的按需引入注册，这样也就导致了打包之后可能会出现不需要的组件代码，开发者可以根据实际情况，去掉全局的按需引入，改为局部引入，或者删除不必要的全局注册，减少打包体积。具体代码可查看`src/element-ui/index.ts`。

除了 `element-ui` 中的组件进行了全局注册，本项目还全局注册了使用率比较高的组件，具体代码可查看`src/components/index.ts`，如下

```javaScript
import Vue from 'vue'
import SvgIcon from './SvgIcon/index.vue' // svg组件
import Table from './Table/index.vue' // ComTable组件
import Search from './Search/index.vue' // Search组件
import Dialog from './Dialog/index.vue' // Dialog组件
import Detail from './Detail/index.vue' // Detail组件

// register globally
Vue.component('SvgIcon', SvgIcon)
Vue.component('ComTable', Table)
Vue.component('ComSearch', Search)
Vue.component('ComDialog', Dialog)
Vue.component('ComDetail', Detail)

import '@/assets/icons' // icon

```

`vue-element-plus-admin`的组件大部分没有进行全局注册。采用了哪里使用哪里引入的方式，如下

```vue
<template>
  <div>
    <qrcode text="vue-element-plus-admin" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Qrcode: () => import('_c/Qrcode/index.vue')
  }
})
</script>

<style></style>
```

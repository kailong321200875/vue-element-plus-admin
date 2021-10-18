<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="文字高亮组件 -- 基础用法"
      type="info"
      style="margin-bottom: 20px"
    />
    <highlight :keys="['vue-element-plus-admin', 'vue-element-admin', 'vben-admin']">
      vue-element-plus-admin是一个基于vue3、vite2、element-plus的后台解决方案，借鉴了vue-element-admin和vben-admin的写法和优点。内置了动态路由，权限验证，典型的业务模型，丰富的功能组件，并且提供了多页配置，开箱即用，可以用来作为项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。
    </highlight>

    <el-alert
      effect="dark"
      :closable="false"
      title="文字高亮组件 -- 点击事件"
      type="info"
      style="margin-top: 20px; margin-bottom: 20px"
    />
    <highlight
      :keys="['vue-element-plus-admin', 'vue-element-admin', 'vben-admin']"
      @click="keyClick"
    >
      vue-element-plus-admin是一个基于vue3、vite2、element-plus的后台解决方案，借鉴了vue-element-admin和vben-admin的写法和优点。内置了动态路由，权限验证，典型的业务模型，丰富的功能组件，并且提供了多页配置，开箱即用，可以用来作为项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。
    </highlight>
  </div>
</template>

<script setup lang="ts" name="HighlightDemo">
import Highlight from '_c/Highlight/index'
import { Message } from '_c/Message'
function keyClick(key: string) {
  Message.success(key)
}
</script>

<style></style>

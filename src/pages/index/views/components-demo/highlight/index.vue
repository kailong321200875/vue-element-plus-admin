<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="文字高亮组件 -- 基础用法"
      type="info"
      style="margin-bottom: 20px;"
    />
    <highlight :keys="['vue-element-admin 2.0', 'vue-element-admin', 'iview-admin']">
      vue-element-admin 2.0是一个基于vue2.x、vue-cli4.x、element-ui的后台解决方案，借鉴了vue-element-admin和iview-admin的写法和优点。内置了动态路由，权限验证，典型的业务模型，丰富的功能组件，并且提供了多页配置，开箱即用，可以用来作为项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。
    </highlight>

    <el-alert
      effect="dark"
      :closable="false"
      title="文字高亮组件 -- 点击事件"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <highlight :keys="['vue-element-admin 2.0', 'vue-element-admin', 'iview-admin']" @click="keyClick">
      vue-element-admin 2.0是一个基于vue2.x、vue-cli4.x、element-ui的后台解决方案，借鉴了vue-element-admin和iview-admin的写法和优点。内置了动态路由，权限验证，典型的业务模型，丰富的功能组件，并且提供了多页配置，开箱即用，可以用来作为项目的启动模版。它可以帮助你快速搭建企业级中后台产品原型，也可以作为一个示例，用于学习。
    </highlight>
  </div>
</template>

<script lang="ts">
import Highlight from '_c/Highlight/index.vue'
import { defineComponent } from 'vue'
import { Message } from '_c/Message'
export default defineComponent({
  // name: 'HighlightDemo',
  components: {
    Highlight
  },
  setup() {
    function keyClick(key: string) {
      Message.success(key)
    }

    return {
      keyClick
    }
  }
})
</script>

<style>
</style>

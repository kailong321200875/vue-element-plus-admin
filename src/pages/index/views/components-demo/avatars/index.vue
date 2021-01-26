<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="头像组组件 -- 基础用法"
      type="info"
      style="margin-bottom: 20px;"
    />
    <avatars :data="data" />

    <el-alert
      effect="dark"
      :closable="false"
      title="头像组组件 -- 不显示tooltip"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <avatars :data="data" :tooltip="false" />

    <el-alert
      effect="dark"
      :closable="false"
      title="头像组组件 -- 最多展示5"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <avatars :data="data" :max="5" />

    <el-alert
      effect="dark"
      :closable="false"
      title="头像组组件 -- 展示头像"
      type="info"
      style="margin-bottom: 20px;margin-top: 20px;"
    />
    <avatars show-avatar :data="data1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Avatars from '_c/Avatars/index.vue'
export default defineComponent({
  name: 'AvatarsDemo',
  components: {
    Avatars
  },
  setup() {
    const data = ref<any[]>([
      { text: '陈某某' },
      { text: '李某某', type: 'success' },
      { text: '张某某', type: 'danger' },
      { text: '王某某', type: 'warning' },
      { text: '龙某某' },
      { text: '孙某某' },
      { text: '刘某某' },
      { text: '赵某某' }
    ])
    const data1 = ref<any[]>([
      { text: '陈某某', url: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2863969516,2611770076&fm=26&gp=0.jpg' },
      { text: '李某某', url: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=465970198,3877503753&fm=26&gp=0.jpg' },
      { text: '张某某', url: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1857202600,3614139084&fm=26&gp=0.jpg' },
      { text: '王某某', url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1444080181,4150129244&fm=26&gp=0.jpg' },
      { text: '龙某某', url: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2469786567,2163872639&fm=26&gp=0.jpg' },
      { text: '孙某某', url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4119236579,869456058&fm=26&gp=0.jpg' },
      { text: '刘某某', url: 'xxxxx' },
      { text: '赵某某' }
    ])

    return {
      data, data1
    }
  }
})
</script>

<style>
</style>

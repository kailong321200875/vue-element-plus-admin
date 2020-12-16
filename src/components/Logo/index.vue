<template>
  <router-link class="app-logo" to="/">
    <img :src="require('@/assets/img/logo.png')">
    <div v-if="show" class="sidebar-title">{{ title }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import config from '_p/index/config'

export default defineComponent({
  name: 'Logo',
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  setup(props) {
    const show = ref<boolean>(true)
    watch(
      () => props.collapsed,
      (collapsed: boolean) => {
        if (!collapsed) {
          setTimeout(() => {
            show.value = !collapsed
          }, 400)
        } else {
          show.value = !collapsed
        }
      }
    )
    return {
      show,
      title: config.title
    }
  }
})
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: @topSilderHeight;
  width: 100%;
  background-color: @menuBg;
  img {
    width: 37px;
    height: 37px;
    margin-left: 14px;
  }
  .sidebar-title {
    font-size: 14px;
    font-weight: 700;
    transition: .5s;
    margin-left: 12px;
  }
  .sidebar-title {
    color: #fff;
  }
}
</style>

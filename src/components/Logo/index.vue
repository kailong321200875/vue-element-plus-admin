<template>
  <router-link :class="['app-logo', 'app-logo-' + theme]" to="/">
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
    },
    theme: {
      type: String as PropType<'light' | 'dark'>,
      default: 'dark'
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
  padding-left: 18px;
  cursor: pointer;
  height: @topSilderHeight;
  max-width: 200px;
  img {
    width: 37px;
    height: 37px;
  }
  .sidebar-title {
    font-size: 14px;
    font-weight: 700;
    transition: .5s;
    margin-left: 12px;
  }
}
.app-logo-dark {
  background-color: @menuBg;
  .sidebar-title {
    color: #fff;
  }
}
.app-logo-light {
  background-color: #fff;
  .sidebar-title {
    color: #000;
  }
}
</style>

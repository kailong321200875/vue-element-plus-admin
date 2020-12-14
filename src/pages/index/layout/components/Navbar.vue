<template>
  <div class="navbar">
    <hamburger :collapsed="collapsed" class="hamburger-container" @toggleClick="setCollapsed" />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <screenfull class="right-menu-item hover-effect" />

      <user-info class="right-menu-item hover-effect" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Hamburger from '_c/Hamburger/index.vue'
import Breadcrumb from '_c/Breadcrumb/index.vue'
import Screenfull from '_c/Screenfull/index.vue'
import UserInfo from './UserInfo.vue'
import { appStore } from '_p/index/store/modules/app'
export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull,
    UserInfo
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)

    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }

    return {
      collapsed,
      setCollapsed
    }
  }
})
</script>

<style lang="less" scoped>
.navbar {
  .hamburger-container {
    line-height: @navbarHeight;
    float: left;
    cursor: pointer;
    margin-left: 15px;
    &:hover {
      background: rgba(0, 0, 0, .025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: @navbarHeight;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
    }
  }
}
</style>

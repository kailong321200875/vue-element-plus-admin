<template>
  <a-dropdown class="avatar-container" :trigger="['hover']">
    <div>
      <div class="avatar-wrapper">
        <img :src="require('@/assets/img/avatar.gif')" class="user-avatar">
        <span class="name-item">管理员</span>
      </div>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <router-link to="/">
            首页
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <span style="display: block;" @click="loginOut">退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resetRouter } from '_p/index/router'
import wsCache from '@/cache'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'UserInfo',
  setup() {
    const { replace } = useRouter()
    async function loginOut(): Promise<void> {
      wsCache.clear()
      await resetRouter() // 重置静态路由表
      // this.$store.dispatch('delAllViews') // 删除所有的tags标签页
      replace('/login')
    }
    return {
      loginOut
    }
  }
})
</script>

<style lang="less" scoped>
.avatar-container {
  margin-right: 30px;
  padding: 0 10px;
  .avatar-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 10px;
    }
    .name-item {
      font-size: 14px;
      font-weight: 600;
      display: inline-block;
      margin-left: 5px;
    }
  }
}
</style>

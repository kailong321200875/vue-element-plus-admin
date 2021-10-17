<template>
  <el-dropdown class="avatar-container" trigger="hover">
    <div id="user-container" class="avatar-wrapper">
      <img :src="avatarImg" class="user-avatar" />
      <span class="name-item">管理员</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item key="1">
          <div @click="toHome">首页</div>
        </el-dropdown-item>
        <el-dropdown-item key="2">
          <div @click="loginOut">退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="UserInfo">
import { resetRouter } from '@/router'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
import { useTagsViewStore } from '@/store/modules/tags-view'
const tagsViewStore = useTagsViewStore()
import { useCache } from '@/hooks/web/useCache'
const { wsCache } = useCache()
// @ts-ignore
import avatarImg from '@/assets/img/avatar.png'

const { replace, push } = useRouter()
async function loginOut(): Promise<void> {
  // wsCache.clear()
  wsCache.delete(appStore.getUserInfo)
  await resetRouter() // 重置静态路由表
  await tagsViewStore.delAllViews() // 删除所有的tags标签页
  replace('/login')
}
function toHome() {
  push('/')
}
</script>

<style lang="less" scoped>
.avatar-container {
  // margin-right: 30px;
  padding: 0 10px;

  .avatar-wrapper {
    display: flex;
    height: 100%;
    cursor: pointer;
    align-items: center;

    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 10px;
    }

    .name-item {
      display: inline-block;
      margin-left: 5px;
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>

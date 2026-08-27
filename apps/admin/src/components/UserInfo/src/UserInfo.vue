<script setup lang="ts">
  import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import { useUserStore } from '@/store/modules/user'
  import { logoutApi } from '@/api/login'

  const userStore = useUserStore()

  const prefixCls = 'v-user-info'

  const { t } = useI18n()

  const loginOut = async () => {
    try {
      await ElMessageBox.confirm(t('common.loginOutMessage'), t('common.reminder'), {
        confirmButtonText: t('common.ok'),
        cancelButtonText: t('common.cancel'),
        type: 'warning'
      })
    } catch {
      return
    }

    try {
      await logoutApi()
    } finally {
      await userStore.logout()
    }
  }

  const toDocument = () => {
    window.open('https://docs.element-plus-admin.cn/')
  }
</script>

<template>
  <ElDropdown class="header-action" :class="prefixCls" trigger="click">
    <div class="flex items-center">
      <img
        src="@/assets/imgs/avatar.jpg"
        alt=""
        class="w-[calc(var(--logo-height)-25px)] rounded-[50%]"
      />
      <span class="<lg:hidden text-14px pl-[5px] text-[var(--top-header-text-color)]">{{
        userStore.userInfo?.username
      }}</span>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem>
          <div @click="toDocument">{{ t('common.document') }}</div>
        </ElDropdownItem>
        <ElDropdownItem divided>
          <div @click="loginOut">{{ t('common.loginOut') }}</div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

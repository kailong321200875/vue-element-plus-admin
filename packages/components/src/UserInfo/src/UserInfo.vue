<script setup lang="ts">
  import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElMessageBox } from 'element-plus'
  import { useI18n } from 'vue-i18n'
  import { useDesign } from '@/hooks/web/useDesign'
  import { useUserStore } from '@/store/modules/user'
  import { loginOutApi } from '@/api/login'
  import { useRouter } from 'vue-router'

  const { push } = useRouter()

  const userStore = useUserStore()

  const { getPrefixCls } = useDesign()

  const prefixCls = getPrefixCls('user-info')

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
      await loginOutApi()
    } finally {
      await userStore.logout()
    }
  }

  const toDocument = () => {
    window.open('https://element-plus-admin-doc.cn/')
  }

  const toPage = (path: string) => {
    push(path)
  }
</script>

<template>
  <ElDropdown class="custom-hover" :class="prefixCls" trigger="click">
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
          <div @click="toPage('/personal/personal-center')">
            {{ t('router.personalCenter') }}
          </div>
        </ElDropdownItem>
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

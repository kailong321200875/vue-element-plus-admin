<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { ElSwitch } from 'element-plus'
import { useCssVar } from '@vueuse/core'
import { useDesign } from '@/hooks/web/useDesign'
import { useIcon } from '@/hooks/web/useIcon'

const Sun = useIcon({ icon: 'emojione-monotone:sun', color: '#fde047' })

const CrescentMoon = useIcon({ icon: 'emojione-monotone:crescent-moon', color: '#fde047' })

const appStore = useAppStore()

// 初始化获取是否是暗黑主题
const isDark = ref(appStore.getIsDark)

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('theme-switch')

// 设置switch的背景颜色
const blackColor = useCssVar('--el-color-black', document.documentElement)

function themeChange(val: boolean) {
  appStore.setIsDark(val)
}
</script>

<template>
  <ElSwitch
    :class="prefixCls"
    v-model="isDark"
    inline-prompt
    :border-color="blackColor"
    :inactive-color="blackColor"
    :active-color="blackColor"
    :active-icon="Sun"
    :inactive-icon="CrescentMoon"
    @change="themeChange"
  />
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-theme-switch';
</style>

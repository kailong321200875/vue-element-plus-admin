<script setup lang="ts">
  import { ElDropdown, ElDropdownMenu, ElDropdownItem, ComponentSize } from 'element-plus'
  import { useAppStore } from '@/store/modules/app'
  import { useI18n } from 'vue-i18n'
  import { propTypes } from '@/utils/propTypes'
  import { useDesign } from '@/hooks/web/useDesign'
  import { componentSizes } from '@/config/app'

  const { getPrefixCls } = useDesign()

  const prefixCls = getPrefixCls('size-dropdown')

  defineProps({
    color: propTypes.string.def('')
  })

  const { t } = useI18n()

  const appStore = useAppStore()

  const setCurrentSize = (size: ComponentSize) => {
    appStore.currentSize = size
  }
</script>

<template>
  <ElDropdown :class="prefixCls" trigger="click" @command="setCurrentSize">
    <Icon :size="18" icon="vi-mdi:format-size" :color="color" class="cursor-pointer" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in componentSizes" :key="item" :command="item">
          {{ t(`size.${item}`) }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

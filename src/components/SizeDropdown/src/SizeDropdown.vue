<script setup lang="ts">
import { computed } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const appStore = useAppStore()

const sizeMap = computed(() => appStore.sizeMap)

const setCurrentSize = (size: ElememtPlusSzie) => {
  appStore.setCurrentSize(size)
}
</script>

<template>
  <ElDropdown trigger="click" @command="setCurrentSize">
    <Icon
      :size="18"
      icon="mdi:format-size"
      color="var(--el-text-color-primary)"
      class="cursor-pointer"
    />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in sizeMap" :key="item" :command="item">
          {{ t(`size.${[item]}`) }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

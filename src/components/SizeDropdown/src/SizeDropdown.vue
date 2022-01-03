<script setup lang="ts">
import { computed } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { useCssVar } from '@vueuse/core'
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

const appStore = useAppStore()

const sizeMap = computed(() => appStore.sizeMap)

const textColor = useCssVar('--el-text-color-primary', document.documentElement)

function setSize(size: ElememtPlusSzie) {
  appStore.setSize(size)
}
</script>

<template>
  <ElDropdown trigger="click" @command="setSize">
    <Icon icon="mdi:format-size" :color="textColor" class="cursor-pointer" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in sizeMap" :key="item" :command="item">
          {{ t(`size.${[item]}`) }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

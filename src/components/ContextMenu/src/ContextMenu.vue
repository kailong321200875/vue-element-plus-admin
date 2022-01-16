<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { PropType } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

defineProps({
  schema: {
    type: Array as PropType<contextMenuSchema[]>,
    default: () => []
  },
  trigger: {
    type: String as PropType<'click' | 'hover' | 'focus' | 'contextmenu'>,
    default: 'contextmenu'
  }
})

const command = (item: contextMenuSchema) => {
  item.command && item.command(item)
}
</script>

<template>
  <ElDropdown
    :trigger="trigger"
    placement="bottom-start"
    @command="command"
    popper-class="v-context-menu-popper"
  >
    <slot></slot>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="(item, index) in schema"
          :key="`dropdown${index}`"
          :divided="item.divided"
          :disabled="item.disabled"
          :command="item"
        >
          <Icon :icon="item.icon" /> {{ t(item.label) }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style lang="less">
.v-context-menu-popper {
  min-width: 150px;
}
</style>

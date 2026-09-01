<script setup lang="ts">
  import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
  import type { PropType } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { ContextMenuSchema } from './types'
  const prefixCls = 'v-context-menu'

  const { t } = useI18n()

  defineProps({
    schema: {
      type: Array as PropType<ContextMenuSchema[]>,
      default: () => []
    },
    trigger: {
      type: String as PropType<'click' | 'hover' | 'contextmenu'>,
      default: 'contextmenu'
    }
  })

  const command = (item: ContextMenuSchema) => item.command?.()
</script>

<template>
  <ElDropdown
    :class="prefixCls"
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
          :key="`${item.label}-${index}`"
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

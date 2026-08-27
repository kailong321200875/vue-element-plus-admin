<script setup lang="ts">
  import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
  import { Icon } from '../../Icon'
  import type { LocaleOption } from './types'

  defineOptions({ inheritAttrs: false })

  withDefaults(
    defineProps<{
      options: readonly LocaleOption[]
      color?: string
      ariaLabel?: string
    }>(),
    {
      color: '',
      ariaLabel: '切换语言 / Switch language'
    }
  )

  const locale = defineModel<string>({ required: true })

  const setLocale = (value: string | number | object) => {
    if (typeof value === 'string' && value !== locale.value) {
      locale.value = value
    }
  }
</script>

<template>
  <ElDropdown class="locale-dropdown" trigger="click" @command="setLocale">
    <button
      v-bind="$attrs"
      type="button"
      class="locale-trigger"
      :style="{ color }"
      :aria-label="ariaLabel"
    >
      <Icon :size="18" icon="mdi:translate" />
    </button>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item in options"
          :key="item.value"
          :command="item.value"
          :disabled="item.value === locale"
        >
          {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped>
  .locale-trigger {
    display: inline-grid;
    padding: 0;
    color: inherit;
    cursor: pointer;
    background: transparent;
    border: 0;
    place-items: center;
  }
</style>

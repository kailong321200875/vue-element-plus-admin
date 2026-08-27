<script setup lang="ts">
  import { ElCard, ElTooltip } from 'element-plus'
  const prefixCls = 'v-content-wrap'

  withDefaults(defineProps<{ title?: string; message?: string }>(), {
    title: '',
    message: ''
  })
</script>

<template>
  <ElCard :class="[prefixCls]" shadow="never">
    <template v-if="title" #header>
      <div class="flex items-center">
        <span class="text-16px font-700">{{ title }}</span>
        <ElTooltip v-if="message" effect="dark" placement="right">
          <template #content>
            <div class="max-w-200px">{{ message }}</div>
          </template>
          <Icon class="ml-5px" icon="mdi:help-circle" :size="14" />
        </ElTooltip>
        <div class="flex pl-20px flex-grow">
          <slot name="header"></slot>
        </div>
      </div>
    </template>
    <div>
      <slot></slot>
    </div>
  </ElCard>
</template>

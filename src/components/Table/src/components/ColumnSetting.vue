<script setup lang="ts">
import { ElDrawer } from 'element-plus'
import { TableColumn } from '../types'
import { PropType, ref, watch, unref } from 'vue'
import { cloneDeep } from 'lodash-es'

const modelValue = defineModel<boolean>()

const oldColumns = ref<TableColumn[]>()

const settingColumns = ref<TableColumn[]>()

const props = defineProps({
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  }
})

watch(
  () => props.columns,
  (columns) => {
    if (!unref(oldColumns)) {
      oldColumns.value = cloneDeep(columns?.filter((item) => item.field !== 'expand'))
    }
    if (!unref(settingColumns)) {
      settingColumns.value = cloneDeep(columns?.filter((item) => item.field !== 'expand'))
      console.log(settingColumns.value)
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <ElDrawer v-model="modelValue" title="列设置"> djdjjddjdjd </ElDrawer>
</template>

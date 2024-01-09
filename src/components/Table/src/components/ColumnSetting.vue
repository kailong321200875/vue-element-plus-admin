<script setup lang="ts">
import {
  ElDrawer,
  ElCheckbox,
  ElCheckboxGroup,
  ElText,
  ElRadioButton,
  ElRadioGroup
} from 'element-plus'
import { TableColumn } from '../types'
import { PropType, ref, watch, unref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { DEFAULT_FILTER_COLUMN } from '@/constants'
import { VueDraggable } from 'vue-draggable-plus'

const modelValue = defineModel<boolean>()

const props = defineProps({
  columns: {
    type: Array as PropType<TableColumn[]>,
    default: () => []
  }
})

const emit = defineEmits(['confirm'])

const oldColumns = ref<TableColumn[]>()

const settingColumns = ref<TableColumn[]>()

// 存储不要的列
const hiddenColumns = ref<TableColumn[]>([])

const defaultCheckColumns = ref<string[]>([])
const checkColumns = ref<string[]>([])

const checkAll = ref(false)
const isIndeterminate = ref(true)
const handleCheckAllChange = (val: boolean) => {
  checkColumns.value = val ? unref(defaultCheckColumns) : []
  isIndeterminate.value = false
}

const handleCheckedColumnsChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === unref(defaultCheckColumns)?.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < unref(defaultCheckColumns)?.length
}

const confirm = () => {
  const newColumns = cloneDeep(unref(settingColumns))?.map((item) => {
    const fixed = unref(settingColumns)?.find((col) => col.field === item.field)?.fixed
    item.hidden = !!!unref(checkColumns)?.includes(item.field)
    item.fixed = fixed ? fixed : undefined
    return item
  })
  emit('confirm', [...unref(hiddenColumns), ...(newColumns || [])])
  modelValue.value = false
}

const restore = () => {
  initColumns([...unref(hiddenColumns), ...(unref(oldColumns) || [])], true)
}

const initColumns = (columns: TableColumn[], isReStore = false) => {
  const newColumns = columns?.filter((item) => {
    if (!isReStore) {
      item.fixed = item.fixed !== void 0 ? item.fixed : undefined
    }
    return (item.type && !DEFAULT_FILTER_COLUMN.includes(item.type)) || !item.type
  })
  if (!unref(oldColumns)?.length) {
    oldColumns.value = cloneDeep(newColumns)
  }
  settingColumns.value = cloneDeep(newColumns)

  hiddenColumns.value = cloneDeep(
    columns?.filter((item) => item.type && DEFAULT_FILTER_COLUMN.includes(item.type))
  )

  defaultCheckColumns.value = unref(settingColumns)?.map((item) => item.field) || []
  checkColumns.value =
    unref(settingColumns)
      ?.filter((item) => !item.hidden)
      ?.map((item) => item.field) || []

  if (unref(checkColumns)?.length === unref(defaultCheckColumns)?.length) {
    checkAll.value = true
    isIndeterminate.value = false
  }
}

watch(
  () => props.columns,
  (columns) => {
    initColumns(columns)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <ElDrawer v-model="modelValue" title="列设置" size="350px">
    <div>
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-between">
          <ElCheckbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          />
          <ElText class="ml-8px!">{{ checkColumns.length }} / {{ settingColumns?.length }}</ElText>
        </div>
        <ElText>固定 / 排序</ElText>
      </div>
      <div v-if="settingColumns?.length">
        <VueDraggable
          v-model="settingColumns"
          target=".el-checkbox-group"
          handle=".handle"
          :animation="150"
        >
          <ElCheckboxGroup
            ref="draggableWrap"
            v-model="checkColumns"
            @change="handleCheckedColumnsChange"
          >
            <div
              v-for="item in settingColumns"
              :key="item.field"
              class="flex items-center justify-between mt-12px"
            >
              <ElCheckbox :label="item.field">
                {{ item.label }}
              </ElCheckbox>
              <div class="flex items-center">
                <ElRadioGroup size="small" v-model="item.fixed">
                  <ElRadioButton label="left">
                    <Icon icon="ep:arrow-left" />
                  </ElRadioButton>
                  <ElRadioButton :label="undefined">
                    <Icon icon="ep:close" />
                  </ElRadioButton>
                  <ElRadioButton label="right">
                    <Icon icon="ep:arrow-right" />
                  </ElRadioButton>
                </ElRadioGroup>

                <div class="ml-12px cursor-move handle"><Icon icon="ep:rank" /></div>
              </div>
            </div>
          </ElCheckboxGroup>
        </VueDraggable>
      </div>
    </div>
    <template #footer>
      <div>
        <BaseButton @click="restore">还原</BaseButton>
        <BaseButton type="primary" @click="confirm">确定</BaseButton>
      </div>
    </template>
  </ElDrawer>
</template>

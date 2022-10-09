<script setup lang="ts">
import { PropType, reactive } from 'vue'
import type { TableData } from '@/api/table/types'
import { Descriptions } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag } from 'element-plus'
import { DescriptionsSchema } from '@/types/descriptions'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<Nullable<TableData>>,
    default: () => null
  }
})

const schema = reactive<DescriptionsSchema[]>([
  {
    field: 'title',
    label: t('exampleDemo.title'),
    span: 24
  },
  {
    field: 'author',
    label: t('exampleDemo.author')
  },
  {
    field: 'display_time',
    label: t('exampleDemo.displayTime')
  },
  {
    field: 'importance',
    label: t('exampleDemo.importance')
  },
  {
    field: 'pageviews',
    label: t('exampleDemo.pageviews')
  },
  {
    field: 'content',
    label: t('exampleDemo.content'),
    span: 24
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}">
    <template #importance="{ row }: { row: TableData }">
      <ElTag :type="row.importance === 1 ? 'success' : row.importance === 2 ? 'warning' : 'danger'">
        {{
          row.importance === 1
            ? t('tableDemo.important')
            : row.importance === 2
            ? t('tableDemo.good')
            : t('tableDemo.commonly')
        }}
      </ElTag>
    </template>

    <template #content="{ row }: { row: TableData }">
      <div v-html="row.content"></div>
    </template>
  </Descriptions>
</template>

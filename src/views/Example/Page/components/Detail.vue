<script setup lang="tsx">
import { PropType, reactive } from 'vue'
import type { TableData } from '@/api/table/types'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag } from 'element-plus'

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
    label: t('exampleDemo.importance'),
    slots: {
      default: (data: any) => {
        return (
          <ElTag
            type={data.importance === 1 ? 'success' : data.importance === 2 ? 'warning' : 'danger'}
          >
            {data.importance === 1
              ? t('tableDemo.important')
              : data.importance === 2
                ? t('tableDemo.good')
                : t('tableDemo.commonly')}
          </ElTag>
        )
      }
    }
  },
  {
    field: 'pageviews',
    label: t('exampleDemo.pageviews')
  },
  {
    field: 'content',
    label: t('exampleDemo.content'),
    span: 24,
    slots: {
      default: (data: any) => {
        return <div innerHTML={data.content}></div>
      }
    }
  }
])
</script>

<template>
  <Descriptions :schema="schema" :data="currentRow || {}" />
</template>

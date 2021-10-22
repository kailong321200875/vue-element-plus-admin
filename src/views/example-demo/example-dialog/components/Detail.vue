<template>
  <div>
    <com-detail :data="form" :schema="fromSchema" :collapsed="false" title="文章详情">
      <template #contentContent="scope">
        <div v-html="scope.row.content"></div>
      </template>
    </com-detail>
    <div class="dialong__button--wrap">
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="Detail">
import { PropType, reactive } from 'vue'
import { getExampDetApi } from '../api'
import { SchemaConfig } from '_c/ComDetail/types'

const fromSchema: SchemaConfig[] = [
  {
    field: 'title',
    label: '标题',
    span: 24
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'display_time',
    label: '创建时间'
  },
  {
    field: 'importance',
    label: '重要性'
  },
  {
    field: 'pageviews',
    label: '阅读数'
  },
  {
    field: 'content',
    label: '内容',
    span: 24
  }
]

const props = defineProps({
  info: {
    type: Object as PropType<Nullable<IObj>>,
    default: () => null
  }
})

const emit = defineEmits(['close'])

const form = reactive<IObj>({
  id: '', // id
  author: '', // 作者
  title: '', // 标题
  content: '', // 内容
  importance: '', // 重要性
  display_time: '', // 创建时间
  pageviews: 0 // 阅读数
})

async function getDet() {
  if (props.info) {
    const id = props.info.id
    try {
      const res: any = await getExampDetApi({
        params: {
          id: id
        }
      })
      if (res) {
        for (const key in form) {
          if (key === 'importance') {
            form[key] = (res.data[key] as number).toString()
          } else {
            form[key] = res.data[key]
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}

function close() {
  emit('close')
}

getDet()
</script>

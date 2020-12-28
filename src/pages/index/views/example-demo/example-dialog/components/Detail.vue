<template>
  <div>
    <com-detail
      :data="form"
      :schema="fromSchema"
      :collapsed="false"
      title="文章详情"
    >
      <template #content="scope">
        <div v-html="scope.row.content" />
      </template>
    </com-detail>
    <div class="dialong__button--wrap">
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { InfoWriteParams } from './types'
import { getExampDetApi } from '../api'

const fromSchema: any[] = [
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
    span: 24,
    slots: {
      default: 'content'
    }
  }
]

export default defineComponent({
  name: 'Detail',
  props: {
    info: {
      type: Object as PropType<any>,
      default: () => null
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const form = reactive<InfoWriteParams>({
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
        const id = (props.info as any).id
        try {
          const res = await getExampDetApi({
            params: {
              id: id
            }
          })
          if (res.code === '0000') {
            for (const key in form) {
              if (key === 'importance') {
                form[key] = res.data[key].toString()
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
    getDet()

    function close() {
      emit('close')
    }

    return {
      form,
      fromSchema,
      close
    }
  }
})
</script>

<style>
</style>

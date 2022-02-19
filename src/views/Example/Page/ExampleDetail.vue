<script setup lang="ts">
import Detail from './components/Detail.vue'
import { ContentWrap } from '@/components/ContentWrap'
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { getTableDetApi } from '@/api/table'
import { TableData } from '@/api/table/types'

const { push } = useRouter()

const { query } = useRoute()

const { t } = useI18n()

const currentRow = ref<Nullable<TableData>>(null)

const getTableDet = async () => {
  const res = await getTableDetApi({
    params: {
      id: query.id as string
    }
  })
  if (res) {
    currentRow.value = res.data
  }
}

getTableDet()
</script>

<template>
  <ContentWrap :title="t('exampleDemo.detail')">
    <Detail :current-row="currentRow" />

    <div class="text-center">
      <ElButton @click="push('/example/example-page')">{{ t('dialogDemo.close') }}</ElButton>
    </div>
  </ContentWrap>
</template>

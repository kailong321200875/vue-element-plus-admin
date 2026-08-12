<script setup lang="ts">
  import Detail from './components/Detail.vue'
  import { ContentDetailWrap } from '@/components/ContentDetailWrap'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter, useRoute } from 'vue-router'
  import { getTableDetailApi } from '@/api/table'
  import type { TableItem } from '@/api/table/types'

  const { push, go } = useRouter()

  const { query } = useRoute()

  const { t } = useI18n()

  const currentRow = ref<Nullable<TableItem>>(null)

  const getTableDetail = async () => {
    const res = await getTableDetailApi(query.id as string)
    if (res) {
      currentRow.value = res.data
    }
  }

  getTableDetail()
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.detail')" @back="push('/example/example-page')">
    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
    </template>
    <Detail :current-row="currentRow" />
  </ContentDetailWrap>
</template>

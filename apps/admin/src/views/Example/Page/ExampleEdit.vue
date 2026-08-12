<script setup lang="ts">
  import Write from './components/Write.vue'
  import { ContentDetailWrap } from '@/components/ContentDetailWrap'
  import { ref, unref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter, useRoute } from 'vue-router'
  import { saveTableItemApi, getTableDetailApi } from '@/api/table'
  import type { TableItem } from '@/api/table/types'
  import { useEventBus } from '@/hooks/event/useEventBus'

  const { emit } = useEventBus()

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

  const writeRef = ref<ComponentRef<typeof Write>>()

  const loading = ref(false)

  const save = async () => {
    const write = unref(writeRef)
    const formData = await write?.submit()
    if (formData) {
      loading.value = true
      const res = await saveTableItemApi(formData)
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
      if (res) {
        emit('getList', 'editor')
        push('/example/example-page')
      }
    }
  }
</script>

<template>
  <ContentDetailWrap :title="t('exampleDemo.edit')" @back="push('/example/example-page')">
    <Write ref="writeRef" :current-row="currentRow" />

    <template #header>
      <ElButton @click="go(-1)">
        {{ t('common.back') }}
      </ElButton>
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
    </template>
  </ContentDetailWrap>
</template>
@/hooks/event/useEventBus

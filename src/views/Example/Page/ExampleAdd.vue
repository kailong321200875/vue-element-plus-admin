<script setup lang="ts">
import Write from './components/Write.vue'
import { ContentWrap } from '@/components/ContentWrap'
import { ref, unref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { useRouter } from 'vue-router'
import { saveTableApi } from '@/api/table'
import { TableData } from '@/api/table/types'
import { useEmitt } from '@/hooks/web/useEmitt'

const { emitter } = useEmitt()

const { push } = useRouter()

const { t } = useI18n()

const writeRef = ref<ComponentRef<typeof Write>>()

const loading = ref(false)

const save = async () => {
  const write = unref(writeRef)
  const validate = await write?.elFormRef?.validate()?.catch(() => {})
  if (validate) {
    loading.value = true
    const data = (await write?.getFormData()) as TableData
    const res = await saveTableApi({
      data
    })
      .catch(() => {})
      .finally(() => {
        loading.value = false
      })
    if (res) {
      emitter.emit('getList', 'add')
      push('/example/example-page')
    }
  }
}
</script>

<template>
  <ContentWrap :title="t('exampleDemo.add')">
    <Write ref="writeRef" />

    <div class="text-center">
      <ElButton type="primary" :loading="loading" @click="save">
        {{ t('exampleDemo.save') }}
      </ElButton>
      <ElButton @click="push('/example/example-page')">{{ t('dialogDemo.close') }}</ElButton>
    </div>
  </ContentWrap>
</template>

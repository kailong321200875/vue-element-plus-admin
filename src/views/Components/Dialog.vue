<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { Dialog } from '@/components/Dialog'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'
import { ref } from 'vue'

const { t } = useI18n()

const dialogVisible = ref(false)
</script>

<template>
  <ContentWrap :title="t('dialogDemo.dialog')" :message="t('dialogDemo.dialogDes')">
    <ElButton type="primary" @click="dialogVisible = !dialogVisible">
      {{ t('dialogDemo.open') }}
    </ElButton>
    <Dialog v-model="dialogVisible" :title="t('dialogDemo.dialog')">
      <div v-for="v in 10000" :key="v">{{ v }}</div>
      <template #footer>
        <ElButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</ElButton>
      </template>
    </Dialog>
  </ContentWrap>
</template>

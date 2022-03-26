<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { ElButton } from 'element-plus'
import { useWatermark } from '@/hooks/web/useWatermark'
import { computed, onBeforeUnmount } from 'vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const title = computed(() => appStore.getTitle)

const { setWatermark, clear } = useWatermark()

const { t } = useI18n()

onBeforeUnmount(() => {
  clear()
})
</script>

<template>
  <ContentWrap title="useWatermark">
    <ElButton type="primary" @click="setWatermark(title)">
      {{ t('watermarkDemo.createdWatermark') }}
    </ElButton>
    <ElButton type="danger" @click="clear">{{ t('watermarkDemo.clearWatermark') }}</ElButton>
    <ElButton type="warning" @click="setWatermark(`New${title}`)">
      {{ t('watermarkDemo.resetWatermark') }}
    </ElButton>
  </ContentWrap>
</template>

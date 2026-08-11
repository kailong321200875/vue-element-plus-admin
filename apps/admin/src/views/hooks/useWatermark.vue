<script setup lang="ts">
  import { ContentWrap } from '@/components/ContentWrap'
  import { useI18n } from 'vue-i18n'
  import { useWatermark } from '@/hooks/web/useWatermark'
  import { onBeforeUnmount } from 'vue'
  import { appConfig } from '@/config/app'

  const title = appConfig.title

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

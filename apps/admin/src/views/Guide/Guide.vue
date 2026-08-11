<script setup lang="ts">
  import { ContentWrap } from '@/components/ContentWrap'
  import { useI18n } from 'vue-i18n'
  import { useGuide } from '@/hooks/web/useGuide'

  const { t } = useI18n()

  const { drive } = useGuide()

  const guideStart = () => {
    drive()
  }
</script>

<template>
  <ContentWrap :title="t('guideDemo.guide')" :message="t('guideDemo.message')">
    <ElButton type="primary" @click="guideStart">{{ t('guideDemo.start') }}</ElButton>
  </ContentWrap>
</template>

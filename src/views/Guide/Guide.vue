<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useGuide } from '@/hooks/web/useGuide'

const { t } = useI18n()

const { drive } = useGuide()

const guideStart = () => {
  drive()
}
</script>

<template>
  <ContentWrap :title="t('guideDemo.guide')" :message="t('guideDemo.message')">
    <BaseButton type="primary" @click="guideStart">{{ t('guideDemo.start') }}</BaseButton>
  </ContentWrap>
</template>

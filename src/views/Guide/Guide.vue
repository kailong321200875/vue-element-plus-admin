<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { useIntro } from '@/hooks/web/useIntro'
import { ElButton } from 'element-plus'

const { t } = useI18n()

const { introRef } = useIntro()

const guideStart = () => {
  introRef.start()
}
</script>

<template>
  <ContentWrap :title="t('guideDemo.guide')" :message="t('guideDemo.message')">
    <ElButton type="primary" @click="guideStart">{{ t('guideDemo.start') }}</ElButton>
  </ContentWrap>
</template>

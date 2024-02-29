<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { IAgree } from '@/components/IAgree'

const { t } = useI18n()
</script>

<template>
  <ContentWrap :title="t('router.iAgree')">
    <IAgree
      :link="[
        {
          text: '《隐私政策》',
          url: 'https://www.baidu.com'
        }
      ]"
      text="我同意《隐私政策》"
    />
  </ContentWrap>
</template>

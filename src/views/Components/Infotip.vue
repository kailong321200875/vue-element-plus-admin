<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Infotip } from '@/components/Infotip'

const { t } = useI18n()

const keyClick = (key: string) => {
  if (key === t('iconDemo.accessAddress')) {
    window.open('https://iconify.design/')
  }
}
</script>

<template>
  <ContentWrap :title="t('infotipDemo.infotip')" :message="t('infotipDemo.infotipDes')">
    <Infotip
      :show-index="false"
      :title="`${t('iconDemo.recommendedUse')}${t('iconDemo.iconify')}`"
      :schema="[
        {
          label: t('iconDemo.recommendeDes'),
          keys: ['Iconify']
        },
        {
          label: t('iconDemo.accessAddress'),
          keys: [t('iconDemo.accessAddress')]
        }
      ]"
      @click="keyClick"
    />
  </ContentWrap>
</template>

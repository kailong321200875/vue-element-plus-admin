<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Avatars } from '@/components/Avatars'

const { t } = useI18n()
</script>

<template>
  <ContentWrap :title="t('router.avatars')" :message="t('avatarsDemo.title')">
    <Avatars />
  </ContentWrap>
</template>

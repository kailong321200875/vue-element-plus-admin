<script setup lang="ts">
import { IconPicker } from '@/components/IconPicker'
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const currentIcon = ref('tdesign:book-open')
</script>

<template>
  <ContentWrap :title="t('router.iconPicker')">
    <IconPicker v-model="currentIcon" />
  </ContentWrap>
</template>

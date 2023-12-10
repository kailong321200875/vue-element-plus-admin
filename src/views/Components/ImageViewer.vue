<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { createImageViewer } from '@/components/ImageViewer'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const open = () => {
  createImageViewer({
    urlList: [
      'https://images6.alphacoders.com/657/thumbbig-657194.webp',
      'https://images3.alphacoders.com/677/thumbbig-677688.webp',
      'https://images4.alphacoders.com/200/thumbbig-200966.webp',
      'https://images5.alphacoders.com/657/thumbbig-657248.webp',
      'https://images3.alphacoders.com/679/thumbbig-679917.webp',
      'https://images3.alphacoders.com/737/thumbbig-73785.webp'
    ]
  })
}
</script>

<template>
  <ContentWrap
    :title="t('imageViewerDemo.imageViewer')"
    :message="t('imageViewerDemo.imageViewerDes')"
  >
    <BaseButton type="primary" @click="open">{{ t('imageViewerDemo.open') }}</BaseButton>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ImageCropping } from '@/components/ImageCropping'
</script>

<template>
  <ContentWrap title="图片裁剪">
    <ImageCropping
      :box-width="350"
      :box-height="380"
      image-url="https://images6.alphacoders.com/657/thumbbig-657194.webp"
    />
  </ContentWrap>
</template>

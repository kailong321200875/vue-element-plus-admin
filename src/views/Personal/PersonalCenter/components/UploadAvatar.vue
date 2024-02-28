<script setup lang="ts">
import { ImageCropping } from '@/components/ImageCropping'
import { ref, unref } from 'vue'

defineProps({
  url: {
    type: String,
    default: ''
  }
})

const fileUrl = ref('')

const CropperRef = ref<ComponentRef<typeof ImageCropping>>()

const getBase64 = () => {
  const base64 = unref(CropperRef)?.cropperExpose?.getCroppedCanvas()?.toDataURL() ?? ''
  return base64
}

defineExpose({
  getBase64
})
</script>

<template>
  <div>
    <ImageCropping ref="CropperRef" :image-url="fileUrl || url" />
  </div>
</template>

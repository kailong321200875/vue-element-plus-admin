<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ImageCropping } from '@/components/ImageCropping'
import { ref, unref } from 'vue'
import { ElInput, ElDivider } from 'element-plus'

const cropperExpose = ref<InstanceType<typeof ImageCropping>>()

const base64 = ref('')

const getBase64 = () => {
  base64.value = unref(cropperExpose)?.cropperExpose?.getCroppedCanvas()?.toDataURL() ?? ''
}

const cropperExpose2 = ref<InstanceType<typeof ImageCropping>>()

const base642 = ref('')

const getBase642 = () => {
  base642.value = unref(cropperExpose)?.cropperExpose?.getCroppedCanvas()?.toDataURL() ?? ''
}
</script>

<template>
  <ContentWrap title="图片裁剪">
    <BaseButton type="primary" class="mb-20px" @click="getBase64">裁剪</BaseButton>
    <ElInput v-model="base64" class="mb-20px" type="textarea" />
    <ImageCropping
      ref="cropperExpose"
      image-url="https://hips.hearstapps.com/hmg-prod/images/%E5%AE%8B%E6%99%BA%E5%AD%9D-1597774015.jpg?crop=0.500xw:1.00xh;0.500xw,0&resize=640:*"
    />
    <ElDivider />
    <BaseButton type="primary" class="mb-20px" @click="getBase642">裁剪</BaseButton>
    <ElInput v-model="base642" class="mb-20px" type="textarea" />
    <ImageCropping
      ref="cropperExpose2"
      :show-actions="false"
      box-width="100%"
      :show-result="false"
      image-url="https://hips.hearstapps.com/hmg-prod/images/%E5%AE%8B%E6%99%BA%E5%AD%9D-1597774015.jpg?crop=0.500xw:1.00xh;0.500xw,0&resize=640:*"
    />
  </ContentWrap>
</template>

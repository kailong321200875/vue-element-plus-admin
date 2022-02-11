<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { createImageViewer } from '@/components/ImageViewer'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const open = () => {
  createImageViewer({
    urlList: [
      'https://img1.baidu.com/it/u=657828739,1486746195&fm=26&fmt=auto&gp=0.jpg',
      'https://img0.baidu.com/it/u=3114228356,677481409&fm=26&fmt=auto&gp=0.jpg',
      'https://img1.baidu.com/it/u=508846955,3814747122&fm=26&fmt=auto&gp=0.jpg',
      'https://img1.baidu.com/it/u=3536647690,3616605490&fm=26&fmt=auto&gp=0.jpg',
      'https://img1.baidu.com/it/u=4087287201,1148061266&fm=26&fmt=auto&gp=0.jpg',
      'https://img2.baidu.com/it/u=3429163260,2974496379&fm=26&fmt=auto&gp=0.jpg'
    ]
  })
}
</script>

<template>
  <ContentWrap
    :title="t('imageViewerDemo.imageViewer')"
    :message="t('imageViewerDemo.imageViewerDes')"
  >
    <ElButton type="primary" @click="open">{{ t('imageViewerDemo.open') }}</ElButton>
  </ContentWrap>
</template>

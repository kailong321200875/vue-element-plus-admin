<script setup lang="ts">
import { VideoPlayer, createVideoViewer } from '@/components/VideoPlayer'
import { ContentWrap } from '@/components/ContentWrap'
import { ElButton, ElDivider } from 'element-plus'

const showVideo = () => {
  createVideoViewer({
    url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4',
    poster: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg'
  })
}
</script>

<template>
  <ContentWrap title="视频播放器">
    <VideoPlayer
      url="//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4"
      poster="//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg"
    />

    <ElDivider />
    <ElButton type="primary" @click="showVideo">弹窗展示</ElButton>
  </ContentWrap>
</template>

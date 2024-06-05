<script setup lang="ts">
import { VideoPlayer } from '@/components/VideoPlayer'
import { ElOverlay } from 'element-plus'
import { ref, nextTick } from 'vue'
import { Icon } from '@/components/Icon'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    default: '',
    required: true
  },
  poster: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  }
})

const visible = ref(props.show)

const close = async () => {
  visible.value = false
  await nextTick()
  const wrap = document.getElementById(props.id)
  if (!wrap) return
  document.body.removeChild(wrap)
}
</script>
<template>
  <ElOverlay v-show="visible" @click="close">
    <div class="w-full h-full flex justify-center items-center relative" @click="close">
      <div
        class="w-44px h-44px color-[#fff] bg-[var(--el-text-color-regular)] rounded-full border-[#fff] flex justify-center items-center cursor-pointer absolute top-40px right-40px"
        @click="close"
      >
        <Icon icon="vi-ep:close" :size="24" />
      </div>
      <VideoPlayer :url="url" :poster="poster" />
    </div>
  </ElOverlay>
</template>

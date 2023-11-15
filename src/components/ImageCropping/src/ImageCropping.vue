<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { nextTick, unref, ref, watch, onBeforeUnmount, onMounted } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

// interface CropperOptions extends /* @vue-ignore */ Cropper.Options {
//   imageUrl: string
// }

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('image-cropping')

const props = defineProps({
  imageUrl: {
    type: String,
    default: '',
    required: true
  },
  cropBoxWidth: {
    type: Number,
    default: 200
  },
  cropBoxHeight: {
    type: Number,
    default: 200
  }
})

const imgRef = ref<HTMLImageElement>()
const cropperRef = ref<Cropper>()
const intiCropper = () => {
  if (!unref(imgRef)) return
  const imgEl = unref(imgRef)!
  cropperRef.value = new Cropper(imgEl, {
    aspectRatio: 1,
    viewMode: 1,
    dragMode: 'move',
    cropBoxResizable: false,
    cropBoxMovable: false,
    toggleDragModeOnDblclick: false,
    checkCrossOrigin: false,
    ready() {
      const containerData = unref(cropperRef)?.getContainerData()
      unref(cropperRef)?.setCropBoxData({
        width: props.cropBoxWidth,
        height: props.cropBoxHeight,
        left: (containerData?.width || 0) / 2 - 100,
        top: (containerData?.height || 0) / 2 - 100
      })
    }
  })
}

onMounted(() => {
  intiCropper()
})

watch(
  () => props.imageUrl,
  async (url) => {
    await nextTick()
    if (url) {
      unref(cropperRef)?.replace(url)
    }
  }
)

onBeforeUnmount(() => {
  unref(cropperRef)?.destroy()
})

defineExpose({
  cropperExpose: () => unref(cropperRef)
})
</script>

<template>
  <div :class="prefixCls" class="flex justify-center items-center">
    <img
      ref="imgRef"
      :src="imageUrl"
      class="block max-w-full"
      crossorigin="anonymous"
      alt=""
      srcset=""
    />
  </div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { nextTick, unref, ref, watch, onBeforeUnmount, onMounted, computed } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { ElDivider, ElUpload, UploadFile, ElMessage, ElTooltip } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'
import { BaseButton } from '@/components/Button'

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
  },
  boxWidth: {
    type: [Number, String],
    default: 425
  },
  boxHeight: {
    type: [Number, String],
    default: 320
  },
  showResult: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  }
})

const getBase64 = useDebounceFn(() => {
  imgBase64.value = unref(cropperRef)?.getCroppedCanvas()?.toDataURL() ?? ''
}, 80)

const resetCropBox = () => {
  const containerData = unref(cropperRef)?.getContainerData()
  unref(cropperRef)?.setCropBoxData({
    width: props.cropBoxWidth,
    height: props.cropBoxHeight,
    left: (containerData?.width || 0) / 2 - 100,
    top: (containerData?.height || 0) / 2 - 100
  })
  imgBase64.value = unref(cropperRef)?.getCroppedCanvas()?.toDataURL() ?? ''
}

const getBoxStyle = computed(() => {
  return {
    width: `${props.boxWidth}px`,
    height: `${props.boxHeight}px`
  }
})

const getCropBoxStyle = computed(() => {
  return {
    width: `${props.cropBoxWidth}px`,
    height: `${props.cropBoxHeight}px`
  }
})

// 获取对应的缩小倍数的宽高
const getScaleSize = (scale: number) => {
  return {
    width: props.cropBoxWidth * scale + 'px',
    height: props.cropBoxHeight * scale + 'px'
  }
}

const imgBase64 = ref('')
const imgRef = ref<HTMLImageElement>()
const cropperRef = ref<Cropper>()
const intiCropper = () => {
  if (!unref(imgRef)) return
  const imgEl = unref(imgRef)!
  cropperRef.value = new Cropper(imgEl, {
    aspectRatio: 1,
    viewMode: 1,
    dragMode: 'move',
    // cropBoxResizable: false,
    // cropBoxMovable: false,
    toggleDragModeOnDblclick: false,
    checkCrossOrigin: false,
    ready() {
      resetCropBox()
    },
    cropmove() {
      getBase64()
    },
    zoom() {
      getBase64()
    },
    crop() {
      getBase64()
    }
  })
}

const uploadChange = (uploadFile: UploadFile) => {
  // 判断是否是图片
  if (uploadFile?.raw?.type.indexOf('image') === -1) {
    ElMessage.error('请上传图片格式的文件')
    return
  }
  if (!uploadFile.raw) return
  // 获取图片的访问地址
  const url = URL.createObjectURL(uploadFile.raw)
  unref(cropperRef)?.replace(url)
}

const reset = () => {
  unref(cropperRef)?.reset()
}

const rotate = (deg: number) => {
  unref(cropperRef)?.rotate(deg)
}

const scaleX = ref(1)
const scaleY = ref(1)
const scale = (type: 'scaleX' | 'scaleY') => {
  if (type === 'scaleX') {
    scaleX.value = scaleX.value === 1 ? -1 : 1
    unref(cropperRef)?.[type](unref(scaleX))
  } else {
    scaleY.value = scaleY.value === 1 ? -1 : 1
    unref(cropperRef)?.[type](unref(scaleY))
  }
}

const zoom = (num: number) => {
  unref(cropperRef)?.zoom(num)
}

onMounted(() => {
  intiCropper()
})

watch(
  () => props.imageUrl,
  async (url) => {
    if (url) {
      unref(cropperRef)?.replace(url)
      await nextTick()
      resetCropBox()
    }
  }
)

onBeforeUnmount(() => {
  unref(cropperRef)?.destroy()
})

defineExpose({
  cropperExpose: cropperRef
})
</script>

<template>
  <div
    :class="{
      [prefixCls]: true,
      'flex items-center': showResult
    }"
  >
    <div>
      <div :style="getBoxStyle" class="flex justify-center items-center">
        <img
          v-show="imageUrl"
          ref="imgRef"
          :src="imageUrl"
          class="block max-w-full"
          crossorigin="anonymous"
          alt=""
          srcset=""
        />
      </div>
      <div v-if="showActions" class="mt-10px flex items-center">
        <div class="flex items-center">
          <ElTooltip content="选择文件" placement="bottom">
            <ElUpload
              action="''"
              accept="image/*"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="uploadChange"
            >
              <BaseButton size="small" type="primary" class="mt-2px"
                ><Icon icon="ep:upload-filled"
              /></BaseButton>
            </ElUpload>
          </ElTooltip>
        </div>
        <div class="flex items-center justify-end flex-1">
          <ElTooltip content="重置" placement="bottom">
            <BaseButton size="small" type="primary" @click="reset"
              ><Icon icon="ep:refresh"
            /></BaseButton>
          </ElTooltip>
          <ElTooltip content="逆时针旋转" placement="bottom">
            <BaseButton size="small" type="primary" @click="rotate(-45)"
              ><Icon icon="ant-design:rotate-left-outlined"
            /></BaseButton>
          </ElTooltip>
          <ElTooltip content="顺时针旋转" placement="bottom">
            <BaseButton size="small" type="primary" @click="rotate(45)"
              ><Icon icon="ant-design:rotate-right-outlined"
            /></BaseButton>
          </ElTooltip>
          <ElTooltip content="水平翻转" placement="bottom">
            <BaseButton size="small" type="primary" @click="scale('scaleX')"
              ><Icon icon="vaadin:arrows-long-h"
            /></BaseButton>
          </ElTooltip>
          <ElTooltip content="垂直翻转" placement="bottom">
            <BaseButton size="small" type="primary" @click="scale('scaleY')"
              ><Icon icon="vaadin:arrows-long-v"
            /></BaseButton>
          </ElTooltip>
          <ElTooltip content="放大" placement="bottom">
            <BaseButton size="small" type="primary" @click="zoom(0.1)"
              ><Icon icon="ant-design:zoom-in-outlined"
            /></BaseButton>
          </ElTooltip>
          <ElTooltip content="缩小" placement="bottom">
            <BaseButton size="small" type="primary" @click="zoom(-0.1)"
              ><Icon icon="ant-design:zoom-out-outlined"
            /></BaseButton>
          </ElTooltip>
        </div>
      </div>
    </div>
    <div v-if="imgBase64 && showResult" class="ml-20px">
      <div class="flex justify-center items-center">
        <img :src="imgBase64" class="rounded-[50%]" :style="getCropBoxStyle" />
      </div>
      <ElDivider />
      <div class="flex justify-center items-center">
        <img :src="imgBase64" class="rounded-[50%]" :style="getScaleSize(0.2)" />
        <img :src="imgBase64" class="rounded-[50%] ml-20px" :style="getScaleSize(0.25)" />
        <img :src="imgBase64" class="rounded-[50%] ml-20px" :style="getScaleSize(0.3)" />
        <img :src="imgBase64" class="rounded-[50%] ml-20px" :style="getScaleSize(0.35)" />
      </div>
    </div>
  </div>
</template>

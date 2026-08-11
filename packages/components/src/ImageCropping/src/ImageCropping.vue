<script setup lang="ts">
  import { useDesign } from '@/hooks/web/useDesign'
  import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
  import Cropper, { EVENT_CHANGE, EVENT_TRANSFORM } from 'cropperjs'
  import { ElButton, ElDivider, ElUpload, UploadFile, ElMessage, ElTooltip } from 'element-plus'
  import { useDebounceFn } from '@vueuse/core'

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
  const cropperRef = shallowRef<Cropper>()
  const objectUrl = ref('')

  const getCroppedCanvas = () =>
    cropperRef.value?.getCropperSelection()?.$toCanvas({
      width: props.cropBoxWidth,
      height: props.cropBoxHeight
    })

  const getBase64 = async () => (await getCroppedCanvas())?.toDataURL() ?? ''

  const renderPreview = async () => {
    imgBase64.value = await getBase64()
  }

  const refreshPreview = useDebounceFn(renderPreview, 80)

  const resetCropBox = async () => {
    const cropper = cropperRef.value
    const canvas = cropper?.getCropperCanvas()
    const selection = cropper?.getCropperSelection()
    if (!canvas || !selection) return

    const width = Math.min(props.cropBoxWidth, canvas.clientWidth || props.cropBoxWidth)
    const height = Math.min(props.cropBoxHeight, canvas.clientHeight || props.cropBoxHeight)
    const aspectRatio = props.cropBoxWidth / props.cropBoxHeight
    selection.aspectRatio = aspectRatio
    selection.initialAspectRatio = aspectRatio
    selection.$change(
      (canvas.clientWidth - width) / 2,
      (canvas.clientHeight - height) / 2,
      width,
      height
    )
    await renderPreview()
  }

  const initCropper = async () => {
    if (!imgRef.value || !props.imageUrl) return

    cropperRef.value?.destroy()
    const cropper = new Cropper(imgRef.value)
    cropperRef.value = cropper
    const image = cropper.getCropperImage()
    const selection = cropper.getCropperSelection()
    selection?.addEventListener(EVENT_CHANGE, refreshPreview)
    image?.addEventListener(EVENT_TRANSFORM, refreshPreview)
    await image?.$ready()
    image?.$center('contain')
    await resetCropBox()
  }

  const setImage = async (url: string) => {
    const image = cropperRef.value?.getCropperImage()
    if (!image) {
      await nextTick()
      await initCropper()
      return
    }

    image.src = url
    await image.$ready()
    image.$resetTransform().$center('contain')
    await resetCropBox()
  }

  const uploadChange = (uploadFile: UploadFile) => {
    // 判断是否是图片
    if (uploadFile?.raw?.type.indexOf('image') === -1) {
      ElMessage.error('请上传图片格式的文件')
      return
    }
    if (!uploadFile.raw) return
    // 获取图片的访问地址
    if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
    objectUrl.value = URL.createObjectURL(uploadFile.raw)
    void setImage(objectUrl.value)
  }

  const reset = async () => {
    cropperRef.value?.getCropperImage()?.$resetTransform().$center('contain')
    await resetCropBox()
  }

  const rotate = (deg: number) => {
    cropperRef.value?.getCropperImage()?.$rotate(`${deg}deg`)
    refreshPreview()
  }

  const scale = (type: 'scaleX' | 'scaleY') => {
    cropperRef.value
      ?.getCropperImage()
      ?.$scale(type === 'scaleX' ? -1 : 1, type === 'scaleY' ? -1 : 1)
    refreshPreview()
  }

  const zoom = (num: number) => {
    cropperRef.value?.getCropperImage()?.$zoom(num)
    refreshPreview()
  }

  onMounted(() => {
    void initCropper()
  })

  watch(
    () => props.imageUrl,
    async (url) => {
      if (!url) {
        cropperRef.value?.destroy()
        cropperRef.value = undefined
        imgBase64.value = ''
        return
      }
      await nextTick()
      await setImage(url)
    }
  )

  onBeforeUnmount(() => {
    cropperRef.value?.destroy()
    if (objectUrl.value) URL.revokeObjectURL(objectUrl.value)
  })

  defineExpose({
    cropperExpose: cropperRef,
    getCroppedCanvas,
    getBase64
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
              <ElButton size="small" type="primary" class="mt-2px"
                ><Icon icon="vi-ep:upload-filled"
              /></ElButton>
            </ElUpload>
          </ElTooltip>
        </div>
        <div class="flex items-center justify-end flex-1">
          <ElTooltip content="重置" placement="bottom">
            <ElButton size="small" type="primary" @click="reset"
              ><Icon icon="vi-ep:refresh"
            /></ElButton>
          </ElTooltip>
          <ElTooltip content="逆时针旋转" placement="bottom">
            <ElButton size="small" type="primary" @click="rotate(-45)"
              ><Icon icon="vi-ant-design:rotate-left-outlined"
            /></ElButton>
          </ElTooltip>
          <ElTooltip content="顺时针旋转" placement="bottom">
            <ElButton size="small" type="primary" @click="rotate(45)"
              ><Icon icon="vi-ant-design:rotate-right-outlined"
            /></ElButton>
          </ElTooltip>
          <ElTooltip content="水平翻转" placement="bottom">
            <ElButton size="small" type="primary" @click="scale('scaleX')"
              ><Icon icon="vi-vaadin:arrows-long-h"
            /></ElButton>
          </ElTooltip>
          <ElTooltip content="垂直翻转" placement="bottom">
            <ElButton size="small" type="primary" @click="scale('scaleY')"
              ><Icon icon="vi-vaadin:arrows-long-v"
            /></ElButton>
          </ElTooltip>
          <ElTooltip content="放大" placement="bottom">
            <ElButton size="small" type="primary" @click="zoom(0.1)"
              ><Icon icon="vi-ant-design:zoom-in-outlined"
            /></ElButton>
          </ElTooltip>
          <ElTooltip content="缩小" placement="bottom">
            <ElButton size="small" type="primary" @click="zoom(-0.1)"
              ><Icon icon="vi-ant-design:zoom-out-outlined"
            /></ElButton>
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

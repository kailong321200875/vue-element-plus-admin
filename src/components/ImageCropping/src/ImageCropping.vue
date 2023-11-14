<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign'
import { propTypes } from '@/utils/propTypes'
import { CSSProperties, computed } from 'vue'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('image-cropping')

const bgIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC'

const props = defineProps({
  imageUrl: propTypes.string,
  boxWidth: propTypes.oneOfType([propTypes.number, propTypes.string]).def('100%'),
  boxHeight: propTypes.oneOfType([propTypes.number, propTypes.string]).def('100%'),
  dragWidth: propTypes.oneOfType([propTypes.number, propTypes.string]).def(200),
  dragHeight: propTypes.oneOfType([propTypes.number, propTypes.string]).def(200),
  cropWidth: propTypes.oneOfType([propTypes.number, propTypes.string]).def(200),
  cropHeight: propTypes.oneOfType([propTypes.number, propTypes.string]).def(200)
})

const boxStyles = computed((): CSSProperties => {
  return {
    width: (typeof props.boxWidth === 'number' ? `${props.boxWidth}px` : props.boxWidth) ?? '100%',
    height:
      (typeof props.boxHeight === 'number' ? `${props.boxHeight}px` : props.boxHeight) ?? '100%',
    position: 'relative',
    backgroundImage: `url(${bgIcon})`
  }
})

const dragStyles = computed((): CSSProperties => {
  return {
    width: (typeof props.dragWidth === 'number' ? `${props.dragWidth}px` : props.dragWidth) ?? 200,
    height:
      (typeof props.dragHeight === 'number' ? `${props.dragHeight}px` : props.dragHeight) ?? 200,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    boxShadow: '0 0 0 1px var(--el-color-primary),0 0 0 10000px rgba(0,0,0,.5)',
    cursor: 'move'
  }
})

const cropStyles = computed((): CSSProperties => {
  return {
    width: (typeof props.cropWidth === 'number' ? `${props.cropWidth}px` : props.cropWidth) ?? 300,
    height:
      (typeof props.cropHeight === 'number' ? `${props.cropHeight}px` : props.cropHeight) ?? 300,
    position: 'absolute',
    top: '50%',
    left: '80px',
    transform: 'translate(0, -50%)',
    overflow: 'hidden',
    borderRadius: '50%',
    border: '1px solid var(--el-border-color)'
  }
})
</script>

<template>
  <div :class="prefixCls" class="flex">
    <div class="flex-1">
      <div :style="boxStyles">
        <img :src="imageUrl" class="w-full absolute top-[50%] left-[50%]" alt="" srcset="" />
        <div :style="dragStyles"> </div>
      </div>
    </div>
    <div class="relative w-full">
      <div :style="cropStyles"></div>
    </div>
  </div>
</template>

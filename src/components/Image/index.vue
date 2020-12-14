<template>
  <div ref="imageRef" class="image">
    <slot v-if="loading" name="placeholder">
      <div class="image__placeholder" />
    </slot>
    <slot v-else-if="error" name="error">
      <div class="image__error">加载失败</div>
    </slot>
    <img
      v-else
      v-bind="$attrs"
      :src="src"
      :style="imageStyle"
      :class="{ 'image__inner--center': alignCenter }"
      class="image__inner"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch, onMounted, onBeforeUnmount, getCurrentInstance, unref } from 'vue'
import { on, off, getScrollContainer, isInContainer } from '@/utils/dom-utils'
import { isString, isElement } from '@/utils/is'
import throttle from 'lodash-es/throttle'

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down'
}

export default defineComponent({
  name: 'Image',
  // inheritAttrs: false,
  props: {
    src: {
      type: String as PropType<string>,
      default: ''
    },
    fit: {
      type: String as PropType<string>,
      default: ''
    },
    lazy: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    scrollContainer: {
      type: Object as PropType<any>,
      default: null
    }
  },
  emits: ['error'],
  setup(props, { emit }) {
    const { ctx } = getCurrentInstance() as any

    const imageRef = ref<HTMLElement | null>(null)

    const loading = ref<boolean>(true)
    const error = ref<boolean>(false)
    const show = ref<boolean>(!props.lazy)
    const imageWidth = ref<number>(0)
    const imageHeight = ref<number>(0)
    const imageStyle = computed((): any => {
      const { fit } = props
      // if (!isServer && fit) {
      if (fit) {
        return isSupportObjectFit()
          ? { 'object-fit': fit }
          : getImageStyle(fit)
      }
      return {}
    })
    const alignCenter = computed((): boolean => {
      const { fit } = props
      // return !isServer && !isSupportObjectFit() && fit !== ObjectFit.FILL
      return !isSupportObjectFit() && fit !== ObjectFit.FILL
    })

    let _scrollContainer: any = null
    let _lazyLoadHandler: any = null

    watch(
      () => show.value,
      (show: boolean) => {
        show && loadImage()
      }
    )

    watch(
      () => props.src,
      () => {
        show.value && loadImage()
      }
    )

    onMounted(() => {
      if (props.lazy) {
        addLazyLoadListener()
      } else {
        loadImage()
      }
    })

    onBeforeUnmount(() => {
      props.lazy && removeLazyLoadListener()
    })

    function loadImage(): void {
      // reset status
      loading.value = true
      error.value = false

      const img = new Image()
      img.onload = (e: any) => handleLoad(e, img)
      img.onerror = (e: any) => handleError(e)

      // bind html attrs
      // so it can behave consistently
      Object.keys(ctx.$attrs)
        .forEach((key) => {
          const value = ctx.$attrs[key]
          img.setAttribute(key, value)
        })
      img.src = props.src
    }

    function handleLoad(e: any, img: any): void {
      imageWidth.value = img.width
      imageHeight.value = img.height
      loading.value = false
    }

    function handleError(e: any): void {
      loading.value = false
      error.value = true
      emit('error', e)
    }

    function handleLazyLoad(): void {
      const imageRefWrap = unref(imageRef) as any
      if (isInContainer(imageRefWrap, _scrollContainer)) {
        show.value = true
        removeLazyLoadListener()
      }
    }

    function addLazyLoadListener(): void {
      // if (isServer) return

      const { scrollContainer } = props
      let __scrollContainer = null

      if (isElement(scrollContainer)) {
        __scrollContainer = scrollContainer
      } else if (isString(scrollContainer)) {
        __scrollContainer = document.querySelector(scrollContainer as any)
      } else {
        const imageRefWrap = unref(imageRef) as any
        __scrollContainer = getScrollContainer(imageRefWrap)
      }
      if (__scrollContainer) {
        _scrollContainer = __scrollContainer
        _lazyLoadHandler = throttle(handleLazyLoad, 200)
        on(__scrollContainer, 'scroll', _lazyLoadHandler)
        handleLazyLoad()
      }
    }

    function removeLazyLoadListener(): void {
      // if (isServer || !_scrollContainer || !_lazyLoadHandler) return
      if (!_scrollContainer || !_lazyLoadHandler) return

      off(_scrollContainer, 'scroll', _lazyLoadHandler)
      _scrollContainer = null
      _lazyLoadHandler = null
    }

    /**
     * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
     */
    function getImageStyle(fit: string): object {
      const imageRefWrap = unref(imageRef) as any
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = imageRefWrap

      if (!imageWidth.value || !imageHeight.value || !containerWidth || !containerHeight) return {}

      const vertical: boolean = imageWidth.value / imageHeight.value < 1

      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller: boolean = imageWidth.value < containerWidth && imageHeight.value < containerHeight
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
      }

      switch (fit) {
      case ObjectFit.NONE:
        return { width: 'auto', height: 'auto' }
      case ObjectFit.CONTAIN:
        return vertical ? { width: 'auto' } : { height: 'auto' }
      case ObjectFit.COVER:
        return vertical ? { height: 'auto' } : { width: 'auto' }
      default:
        return {}
      }
    }

    return {
      imageRef,
      loading, error, show,
      imageStyle, alignCenter
    }
  }
})
</script>

<style lang="less" scoped>
.image {
  position: relative;
  display: inline-block;
  overflow: hidden;
  .image__placeholder {
    background: #f5f7fa;
  }
  .image__error {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #c0c4cc;
    vertical-align: middle;
    height: 100%;
    height: 100%;
    background: #f5f7fa;
  }
}
</style>

<template>
  <div v-loading="loading" class="qrcode__wrap" :style="wrapStyle">
    <component :is="tag" ref="wrapRef" @click="clickCode" />
    <div v-if="disabled" class="disabled__wrap" @click="disabledClick">
      <div>
        <i class="el-icon-refresh-right"></i>
        <div>{{ disabledText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Qrcode">
import { PropType, nextTick, ref, watch, computed, unref } from 'vue'
import type { LogoTypes } from './types'
import QRCode from 'qrcode'
import { QRCodeRenderersOptions } from 'qrcode'
import { deepClone } from '@/utils'
import { isString } from '@/utils/validate'
const { toCanvas, toDataURL } = QRCode

const props = defineProps({
  // img 或者 canvas,img不支持logo嵌套
  tag: {
    type: String as PropType<'canvas' | 'img'>,
    default: 'canvas',
    validator: (v: string) => ['canvas', 'img'].includes(v)
  },
  // 二维码内容
  text: {
    type: [String, Array] as PropType<string | any[]>,
    default: null
  },
  // qrcode.js配置项
  options: {
    type: Object as PropType<QRCodeRenderersOptions>,
    default: () => {
      return {}
    }
  },
  // 宽度
  width: {
    type: Number as PropType<number>,
    default: 200
  },
  // logo
  logo: {
    type: [String, Object] as PropType<Partial<LogoTypes> | string>,
    default: ''
  },
  // 是否过期
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 过期提示内容
  disabledText: {
    type: String as PropType<string>,
    default: '二维码已失效'
  }
})
const emit = defineEmits(['done', 'click', 'disabled-click'])
const loading = ref<boolean>(true)
const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)
const renderText = computed(() => String(props.text))
const wrapStyle = computed(() => {
  return {
    width: props.width + 'px',
    height: props.width + 'px'
  }
})

watch(
  () => renderText.value,
  (val) => {
    if (!val) return
    initQrcode()
  },
  {
    deep: true,
    immediate: true
  }
)

// 初始化
function initQrcode() {
  nextTick(async () => {
    const options = deepClone(props.options || {})
    if (props.tag === 'canvas') {
      // 容错率，默认对内容少的二维码采用高容错率，内容多的二维码采用低容错率
      options.errorCorrectionLevel =
        options.errorCorrectionLevel || getErrorCorrectionLevel(renderText.value)
      getOriginWidth(renderText.value, options).then(async (_width) => {
        options.scale = props.width === 0 ? undefined : (props.width / _width) * 4
        const canvasRef: any = await toCanvas(unref(wrapRef as any), renderText.value, options)
        if (props.logo) {
          const url = await createLogoCode(canvasRef)
          emit('done', url)
          loading.value = false
        } else {
          emit('done', canvasRef.toDataURL())
          loading.value = false
        }
      })
    } else {
      const url = await toDataURL(renderText.value, {
        errorCorrectionLevel: 'H',
        width: props.width,
        ...options
      })
      unref(wrapRef as any).src = url
      emit('done', url)
      loading.value = false
    }
  })
}

// 生成logo
function createLogoCode(canvasRef: HTMLCanvasElement) {
  const canvasWidth = canvasRef.width
  const logoOptions: LogoTypes = Object.assign(
    {
      logoSize: 0.15,
      bgColor: '#ffffff',
      borderSize: 0.05,
      crossOrigin: 'anonymous',
      borderRadius: 8,
      logoRadius: 0
    },
    isString(props.logo) ? {} : props.logo
  )
  const {
    logoSize = 0.15,
    bgColor = '#ffffff',
    borderSize = 0.05,
    crossOrigin = 'anonymous',
    borderRadius = 8,
    logoRadius = 0
  } = logoOptions
  const logoSrc = isString(props.logo) ? props.logo : props.logo.src
  const logoWidth = canvasWidth * logoSize
  const logoXY = (canvasWidth * (1 - logoSize)) / 2
  const logoBgWidth = canvasWidth * (logoSize + borderSize)
  const logoBgXY = (canvasWidth * (1 - logoSize - borderSize)) / 2

  const ctx = canvasRef.getContext('2d')
  if (!ctx) return

  // logo 底色
  canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius)
  ctx.fillStyle = bgColor
  ctx.fill()

  // logo
  const image = new Image()
  if (crossOrigin || logoRadius) {
    image.setAttribute('crossOrigin', crossOrigin)
  }
  ;(image as any).src = logoSrc

  // 使用image绘制可以避免某些跨域情况
  const drawLogoWithImage = (image: HTMLImageElement) => {
    ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)
  }

  // 使用canvas绘制以获得更多的功能
  const drawLogoWithCanvas = (image: HTMLImageElement) => {
    const canvasImage = document.createElement('canvas')
    canvasImage.width = logoXY + logoWidth
    canvasImage.height = logoXY + logoWidth
    const imageCanvas = canvasImage.getContext('2d')
    if (!imageCanvas || !ctx) return
    imageCanvas.drawImage(image, logoXY, logoXY, logoWidth, logoWidth)

    canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius)
    if (!ctx) return
    const fillStyle = ctx.createPattern(canvasImage, 'no-repeat')
    if (fillStyle) {
      ctx.fillStyle = fillStyle
      ctx.fill()
    }
  }

  // 将 logo绘制到 canvas上
  return new Promise((resolve: any) => {
    image.onload = () => {
      logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image)
      resolve(canvasRef.toDataURL())
    }
  })
}

// 得到原QrCode的大小，以便缩放得到正确的QrCode大小
function getOriginWidth(content: string, options: QRCodeRenderersOptions) {
  const _canvas = document.createElement('canvas')
  return toCanvas(_canvas, content, options).then(() => _canvas.width)
}

// 对于内容少的QrCode，增大容错率
function getErrorCorrectionLevel(content: string) {
  if (content.length > 36) {
    return 'M'
  } else if (content.length > 16) {
    return 'Q'
  } else {
    return 'H'
  }
}

// 点击二维码
function clickCode() {
  emit('click')
}

// 失效点击事件
function disabledClick() {
  emit('disabled-click')
}

// copy来的方法，用于绘制圆角
function canvasRoundRect(ctx: CanvasRenderingContext2D) {
  return (x: number, y: number, w: number, h: number, r: number) => {
    const minSize = Math.min(w, h)
    if (r > minSize / 2) {
      r = minSize / 2
    }
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
    return ctx
  }
}
</script>

<style lang="less" scoped>
.qrcode__wrap {
  display: inline-block;
  position: relative;
  .disabled__wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
      i {
        font-size: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>

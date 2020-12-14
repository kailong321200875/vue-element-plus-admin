<template>
  <div>
    <a-alert message="抽取于 Element 的图片预览组件进行改造，实现函数式调用组件，无需基于图片进行点击预览。" style="margin-bottom: 20px;" />

    <a-alert message="有底图预览" style="margin-bottom: 20px;" />
    <div class="img-wrap">
      <div
        v-for="(item, $index) in imgList"
        :key="item"
        class="img-item"
        @click="showHasImg($index)"
      >
        <img :src="item" alt="">
      </div>
    </div>

    <a-alert message="无底图预览" style="margin-bottom: 20px; margin-top: 20px;" />
    <a-button type="primary" @click="showNoImg">点击预览</a-button>

    <a-alert message="点击事件，包含图片点击事件以及关闭事件。" style="margin-bottom: 20px; margin-top: 20px;" />
    <a-button type="primary" @click="showImg">点击预览</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createImgPreview } from '_c/Preview/functional'
import { message } from 'ant-design-vue'
export default defineComponent({
  // name: 'PreviewDemo',
  setup() {
    const imgList = ref<string[]>([
      'http://dn-p-tystore.qbox.me/p/chapter/attachment/e_bTeg-weA/EgfWEtftEBfs4BfuEg6uelu_JHH3HUD6I7HMet148BDq5uyiKgem4C2.jpg',
      'http://www.jf258.com/uploads/2014-09-29/012939994.jpg',
      'http://pic1.win4000.com/wallpaper/3/58f4672ad3c5c.jpg'
    ])

    function showHasImg(i: number): void {
      createImgPreview({
        imageList: [
          imgList.value[i]
        ],
        show: true,
        index: 0
      })
    }

    function showNoImg():void {
      createImgPreview({
        imageList: imgList.value,
        show: true,
        index: 0
      })
    }

    function showImg():void {
      createImgPreview({
        imageList: imgList.value,
        show: true,
        index: 0,
        onSelect: (i: number) => {
          message.info('当前点击的图片索引：' + i)
        },
        onClose: (i: number) => {
          message.info('关闭之后的图片索引：' + i)
        }
      })
    }

    return {
      imgList,
      showHasImg, showNoImg, showImg
    }
  }
})
</script>

<style lang="less" scoped>
.img-wrap {
  display: flex;
  justify-content: center;
  .img-item {
    width: 400px;
    height: 300px;
    overflow: hidden;
    position: relative;
    margin: 0 10px;
    cursor: pointer;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

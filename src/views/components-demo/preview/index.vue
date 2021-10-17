<template>
  <div>
    <el-alert
      effect="dark"
      :closable="false"
      title="抽取于 Element 的图片预览组件进行改造，实现函数式调用组件，无需基于图片进行点击预览。"
      type="info"
      style="margin-bottom: 20px"
    />

    <el-alert
      effect="dark"
      :closable="false"
      title="有底图预览。"
      type="info"
      style="margin-bottom: 20px"
    />

    <div class="img-wrap">
      <div
        v-for="(item, $index) in imgList"
        :key="item"
        class="img-item"
        @click="showHasImg($index)"
      >
        <img :src="item" alt="" />
      </div>
    </div>

    <el-alert
      effect="dark"
      :closable="false"
      title="无底图预览。"
      type="info"
      style="margin-top: 20px; margin-bottom: 20px"
    />
    <el-button type="primary" @click="showNoImg">点击预览</el-button>

    <el-alert
      effect="dark"
      :closable="false"
      title="点击事件，包含图片点击事件以及关闭事件。"
      type="info"
      style="margin-top: 20px; margin-bottom: 20px"
    />
    <el-button type="primary" @click="showImg">点击预览</el-button>
  </div>
</template>

<script setup lang="ts" name="PreviewDemo">
import { ref } from 'vue'
import { createImgPreview } from '_c/Preview'
import { Message } from '_c/Message'

const imgList = ref<string[]>([
  'https://img1.baidu.com/it/u=657828739,1486746195&fm=26&fmt=auto&gp=0.jpg',
  'https://img0.baidu.com/it/u=3114228356,677481409&fm=26&fmt=auto&gp=0.jpg',
  'https://img1.baidu.com/it/u=508846955,3814747122&fm=26&fmt=auto&gp=0.jpg',
  'https://img1.baidu.com/it/u=3536647690,3616605490&fm=26&fmt=auto&gp=0.jpg',
  'https://img1.baidu.com/it/u=4087287201,1148061266&fm=26&fmt=auto&gp=0.jpg',
  'https://img2.baidu.com/it/u=3429163260,2974496379&fm=26&fmt=auto&gp=0.jpg'
])

function showHasImg(i: number) {
  createImgPreview({
    index: i,
    imageList: imgList.value
  })
}

function showNoImg() {
  createImgPreview({
    index: 0,
    imageList: imgList.value
  })
}

function showImg() {
  createImgPreview({
    index: 0,
    imageList: imgList.value,
    onClose: (i: number) => {
      Message.info('关闭的图片索引：' + i)
    },
    onSelect: (i: number) => {
      Message.info('当前点击的图片索引：' + i)
    }
  })
}
</script>

<style lang="less" scoped>
.img-wrap {
  display: flex;
  justify-content: center;

  .img-item {
    position: relative;
    width: 400px;
    height: 300px;
    margin: 0 10px;
    overflow: hidden;
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

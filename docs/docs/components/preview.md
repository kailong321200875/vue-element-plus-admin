# Preview 预览

图片预览组件，实现函数式调用组件，无需基于图片进行点击预览。

`Preview` 组件代码位于`src/components/Preview`

## 使用

```vue
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createImgPreview } from '_c/Preview'

export default defineComponent({
  setup() {
    const imgList = ref<IObj>([
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
    return {
      imgList,
      showHasImg
    }
  }
})
</script>
```

## Attributes

| 属性     | 说明               | 类型     | 可选值     | 默认值 |
| -------- | ------------------ | -------- | ---------- | ------ |
| index    | 默认展示第几张图片 | number   | —          | 0      |
| list     | 需要预览的图片列表 | array    | —          | []     |
| zIndex   | 层级               | number   | —          | 2000   |
| infinite | 是否无缝           | boolean  | false/true | true   |
| onClose  | 关闭时的回调       | function | —          | —      |
| onSelect | 点击时的回调       | function | —          | —      |

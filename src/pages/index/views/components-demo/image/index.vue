<template>
  <div>
    <a-alert message="抽取于 Element 的 Image 组件进行改造，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等。" style="margin-bottom: 20px;" />
    <div class="demo-image">
      <div v-for="fit in fits" :key="fit" class="block">
        <span class="demonstration">{{ fit }}</span>
        <c-image
          :src="url"
          :fit="fit"
          style="width: 100px; height: 100px"
        />
      </div>
    </div>

    <a-alert message="占位内容" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="demo-image__placeholder">
      <div class="block">
        <span class="demonstration">默认</span>
        <c-image :src="src" style="width: 300px; height: 200px" />
      </div>
      <div class="block">
        <span class="demonstration">自定义</span>
        <c-image :src="src" style="width: 300px; height: 200px">
          <template #placeholder>
            <div class="image-slot">
              加载中...
            </div>
          </template>
        </c-image>
      </div>
    </div>

    <a-alert message="加载失败" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="demo-image__error">
      <div class="block">
        <span class="demonstration">默认</span>
        <c-image style="width: 300px; height: 200px" />
      </div>
      <div class="block">
        <span class="demonstration">自定义</span>
        <c-image style="width: 300px; height: 200px">
          <template #error>
            <div class="image-slot">
              <PictureOutlined />
            </div>
          </template>
        </c-image>
      </div>
    </div>

    <a-alert message="懒加载" style="margin-bottom: 20px;margin-top: 20px;" />
    <div class="demo-image__lazy">
      <c-image
        v-for="url in urls"
        :key="url"
        :src="url"
        lazy
        style="display: block;min-height: 200px;margin-bottom: 10px;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CImage from '_c/Image/index.vue'
import { PictureOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  // name: 'Image',
  components: {
    CImage,
    PictureOutlined
  },
  setup() {
    const fits = ref<string[]>(['fill', 'contain', 'cover', 'none', 'scale-down'])
    const url = ref<string>('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
    const src = ref<string>('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')
    const urls = ref<string[]>([
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
    ])
    return {
      fits,
      url,
      src,
      urls
    }
  }
})
</script>

<style lang="less" scoped>
.demo-image,
.demo-image__placeholder,
.demo-image__error {
  background: #fff;
}
.demo-image .block,
.demo-image__error .block,
.demo-image__placeholder .block {
  padding: 30px 0;
  text-align: center;
  border-right: 1px solid #eff2f6;
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
  .demonstration {
    display: block;
    margin-bottom: 5px;
  }
  .image__error,
  .image-slot {
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
.demo-image__error .block,
.demo-image__placeholder .block {
  text-align: center;
  width: 49%;
}

.demo-image__lazy {
  width: 800px;
  height: 400px;
  overflow-y: auto;
}
</style>

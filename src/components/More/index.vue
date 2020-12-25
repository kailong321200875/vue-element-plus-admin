<template>
  <div class="more__item clearfix">
    <p class="more__item--text">{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, unref, onMounted, nextTick, ref } from 'vue'
export default defineComponent({
  name: 'More',
  props: {
    // 内容
    content: {
      type: String as PropType<string>,
      default: ''
    },
    // 默认展示几行
    lineClamp: {
      type: Number as PropType<number>,
      default: 0
    },
    // 宽度
    width: {
      type: String as PropType<string>,
      default: '300px'
    },
    // style
    style: {
      type: Object as PropType<object>,
      default: () => {
        return {
          width: '300px',
          float: 'left'
        }
      }
    }
  },
  setup(props) {
    const styleObj = computed(() => {

    })
  }
})
</script>

<style lang="less" scoped>
.more__item {
  width: 528px;
  height: 122px;
  float: left;
  .more__item--text {
    width: 476px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 14px;
    color: #545c63;
    line-height: 28px;
    transition: all .1s;
    text-align: left;
    &:hover {
      background: #fff;
      height: auto;
      position: relative;
      z-index: 5;
      border-radius: 8px;
      box-shadow: 0 8px 16px 0 rgba(7,17,27,.2);
      -webkit-line-clamp: inherit;
       padding: 10px;
      margin-top: -10px;
      margin-left: -10px;
    }
  }
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>

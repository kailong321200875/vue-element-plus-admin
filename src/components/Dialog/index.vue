<template>
  <el-dialog
    v-bind="getBindValue"
    destroy-on-close
    :close-on-click-modal="false"
    top="10vh"
  >
    <template v-if="slots.title" #title>
      <slot name="title" />
    </template>

    <!-- 弹窗内容 -->
    <el-scrollbar class="com-dialog__content">
      <div class="content__wrap">
        <slot />
      </div>
    </el-scrollbar>

    <template v-if="slots.footer" #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'Dialog',
  setup(props, { slots, attrs }) {
    const getBindValue = computed((): any => {
      const bindValue = { ...attrs, ...props }
      return bindValue
    })

    return {
      getBindValue,
      slots
    }
  }
})
</script>

<style lang="less" scoped>
.com-dialog__content {
  .content__wrap {
    padding-right: 10px;
  }
  @{deep}(.el-scrollbar__wrap ) {
		max-height: 600px; // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
</style>

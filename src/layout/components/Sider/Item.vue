<template>
  <i v-if="icon && icon.includes('el-icon')" :class="[icon, 'sub-el-icon', 'anticon']"></i>
  <svg-icon v-else-if="icon" :icon-class="icon" class="anticon" />
  <slot name="title">
    <span class="anticon-item">{{ title }}</span>
  </slot>
</template>

<script setup lang="ts" name="Item">
import { PropType } from 'vue'
defineProps({
  icon: {
    type: String as PropType<string>,
    default: ''
  },
  title: {
    type: String as PropType<string>,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.anticon-item {
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>

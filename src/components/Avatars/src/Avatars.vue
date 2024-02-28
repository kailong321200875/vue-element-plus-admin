<script setup lang="ts">
import { ComponentSize } from 'element-plus'
import { PropType } from 'vue'

defineProps({
  size: {
    type: String as PropType<ComponentSize>,
    default: ''
  }
})
</script>

<template>
  <div> 头像 </div>
</template>

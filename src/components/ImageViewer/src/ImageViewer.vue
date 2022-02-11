<script setup lang="ts">
import { ElImageViewer } from 'element-plus'
import { computed, ref } from 'vue'
import { imageViewerProps } from './props'

const props = defineProps(imageViewerProps)

const getBindValue = computed(() => {
  const propsData: Recordable = { ...props }
  delete propsData.show
  return propsData
})

const show = ref(props.show)

const close = () => {
  show.value = false
}
</script>

<template>
  <ElImageViewer v-if="show" v-bind="getBindValue" @close="close" />
</template>
